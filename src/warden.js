// Warden Agent enforcement logic.
// Low and medium severity triggers revoke the investor's whitelist
// status, a reversible action, access can be restored later once
// the issue is resolved. High severity triggers go further and
// burn the investor's tokens outright, since some situations (like
// a sanctions hit) cannot wait for a review process.

import fs from "fs";
import { runIssuerAction } from "./brickkenRest.js";

const WALLET_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";
const LOG_PATH = "logs/warden-actions.json";

function logAction(entry) {
  let log = [];
  if (fs.existsSync(LOG_PATH)) {
    log = JSON.parse(fs.readFileSync(LOG_PATH, "utf-8"));
  }
  log.push(entry);
  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2));
}

async function revokeWhitelist(trigger) {
  console.log("Warden: revoking whitelist status for", trigger.investorEmail);

  const result = await runIssuerAction({
    chainId: "11155111",
    method: "whitelist",
    tokenSymbol: "BWP",
    signerAddress: WALLET_ADDRESS,
    userToWhitelist: [
      {
        investorAddress: trigger.investorAddress,
        investorEmail: trigger.investorEmail,
        whitelistStatus: false,
      },
    ],
  });

  return result?.results?.[0]?.result?.txResponses?.[0]?.hash || "unknown";
}

async function burnTokens(trigger, amount) {
  console.log("Warden: burning", amount, "BWP from", trigger.investorEmail);

  const result = await runIssuerAction({
    chainId: "11155111",
    method: "burnToken",
    tokenSymbol: "BWP",
    signerAddress: WALLET_ADDRESS,
    investorEmail: trigger.investorEmail,
    amount: amount,
  });

  return result?.results?.[0]?.result?.txResponses?.[0]?.hash || "unknown";
}

export async function enforceOnTrigger(trigger) {
  console.log("Warden: trigger detected —", trigger.type, "(severity:", trigger.severity + ")");
  console.log("Warden: reason —", trigger.reason);

  let action;
  let txHash;

  if (trigger.severity === "high") {
    action = "burn_tokens";
    txHash = await burnTokens(trigger, "500");
  } else {
    action = "revoke_whitelist";
    txHash = await revokeWhitelist(trigger);
  }

  logAction({
    action,
    triggerType: trigger.type,
    severity: trigger.severity,
    reason: trigger.reason,
    investorEmail: trigger.investorEmail,
    investorAddress: trigger.investorAddress,
    timestamp: new Date().toISOString(),
    txHash,
  });

  console.log("Warden: enforcement complete, action:", action, "tx:", txHash);
  return { action, txHash };
}

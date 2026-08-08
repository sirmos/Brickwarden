// Warden Agent enforcement logic.
// When a trigger fires, the Warden acts on its own, revoking the
// investor's whitelist status on the token. This uses the same Dapp
// API the Issuer Agent uses, since enforcement actions are on-chain
// writes made by the tokenizer wallet.

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

export async function enforceOnTrigger(trigger) {
  console.log("Warden: trigger detected —", trigger.type);
  console.log("Warden: reason —", trigger.reason);
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

  const txHash =
    result?.results?.[0]?.result?.txResponses?.[0]?.hash || "unknown";

  logAction({
    action: "revoke_whitelist",
    triggerType: trigger.type,
    reason: trigger.reason,
    investorEmail: trigger.investorEmail,
    investorAddress: trigger.investorAddress,
    timestamp: new Date().toISOString(),
    txHash,
  });

  console.log("Warden: enforcement complete. tx —", txHash);
  return result;
}

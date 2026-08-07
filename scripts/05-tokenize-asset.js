// This runs the first real on-chain action for Brickwarden.
// It creates the tokenized asset that the Issuer Agent owns,
// and that the Warden Agent will later protect.

import "dotenv/config";
import { openIssuerSession } from "../src/mcpClient.js";
import { tokenizeAsset } from "../src/issuer.js";

const WALLET_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";

async function main() {
  const client = await openIssuerSession();

  const result = await tokenizeAsset(client, {
    chainId: "11155111",
    tokenizerEmail: "sirmos34@yahoo.com",
    tokenizerAddress: WALLET_ADDRESS,
    signerAddress: WALLET_ADDRESS,
    tokenName: "Brickwarden Property",
    tokenSymbol: "BWP",
    tokenType: "RWA_TOKEN",
    supplyCap: "1000000",
    url: "https://github.com/",
  });

  console.log("");
  console.log("Tokenization result:");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Tokenization failed:", err.message);
  process.exit(1);
});

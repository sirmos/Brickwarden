import "dotenv/config";
import { runIssuerAction } from "../src/brickkenRest.js";

const WALLET_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";
const INVESTOR_EMAIL = "sirmos34@gmail.com";
const INVESTOR_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";

async function main() {
  const result = await runIssuerAction({
    chainId: "11155111",
    method: "mintToken",
    tokenSymbol: "BWP",
    signerAddress: WALLET_ADDRESS,
    userToMint: [
      {
        investorEmail: INVESTOR_EMAIL,
        investorAddress: INVESTOR_ADDRESS,
        amount: "500",
        needWhitelist: true,
      },
    ],
  });

  console.log("");
  console.log("Re-mint result:");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Re-mint failed:", err.message);
  process.exit(1);
});

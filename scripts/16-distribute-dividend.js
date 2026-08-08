import "dotenv/config";
import { runIssuerAction } from "../src/brickkenRest.js";

const WALLET_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";

async function main() {
  const result = await runIssuerAction({
    chainId: "11155111",
    method: "dividendDistribution",
    tokenSymbol: "BWP",
    signerAddress: WALLET_ADDRESS,
    amount: "100",
  });

  console.log("");
  console.log("Dividend distribution result:");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});

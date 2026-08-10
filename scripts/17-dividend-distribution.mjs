import "dotenv/config";
import { runIssuerAction } from "../src/brickkenRest.js";

const payload = {
  chainId: 11155111,
  method: "dividendDistribution",
  tokenSymbol: "BWP",
  signerAddress: "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb",
  amount: "40",
};

async function main() {
  const result = await runIssuerAction(payload);
  console.log(JSON.stringify(result, null, 2));
}

main();

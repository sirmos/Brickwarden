import "dotenv/config";
import { runIssuerAction } from "../src/brickkenRest.js";

const WALLET_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";
const ESCROW = "0x88Ca6e0821E8Fa4dE09084d27e41A50693188FE7";

async function main() {
  const result = await runIssuerAction({
    signerAddress: WALLET_ADDRESS,
    chainId: "11155111",
    method: "approve",
    tokenSymbol: "USDT",
    spenderAddress: ESCROW,
    amount: "100",
    tokenizerAddress: WALLET_ADDRESS,
  });

  console.log("");
  console.log("Approve result:");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Approve failed:", err.message);
  process.exit(1);
});

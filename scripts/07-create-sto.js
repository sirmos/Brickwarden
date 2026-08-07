import "dotenv/config";
import { runIssuerAction } from "../src/brickkenRest.js";

const WALLET_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";

async function main() {
<<<<<<< HEAD
  const result = await runIssuerAction({
    chainId: "11155111",
    method: "newSto",
    tokenSymbol: "BWP",
=======
  const startsIn5Minutes = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  const endsIn30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const result = await runIssuerAction({
    chainId: "11155111",
    method: "newSto",
    tokenSymbol: "BWP2",
>>>>>>> eac61a790ac460b109c7cd9163593b22d4f40bff
    tokenizerEmail: "sirmos34@yahoo.com",
    signerAddress: WALLET_ADDRESS,
    tokenAmount: "100000",
    offeringName: "Brickwarden Property Round 1",
    acceptedCoin: "USDT",
<<<<<<< HEAD
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
=======
    startDate: startsIn5Minutes,
    endDate: endsIn30Days,
>>>>>>> eac61a790ac460b109c7cd9163593b22d4f40bff
    minRaiseUSD: "1000",
    maxRaiseUSD: "50000",
    minInvestment: "100",
    maxInvestment: "10000",
  });

  console.log("");
  console.log("STO creation result:");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});

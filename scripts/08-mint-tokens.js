import "dotenv/config";
import { Wallet } from "ethers";

const BASE_URL = "https://api.sandbox.brickken.com";
const API_KEY = process.env.BRICKKEN_API_KEY;
const wallet = new Wallet(process.env.BRICKKEN_PRIVATE_KEY);

async function prepare() {
  const res = await fetch(`${BASE_URL}/prepare-transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify({
      chainId: "11155111",
      method: "mintToken",
      tokenSymbol: "BWP",
      signerAddress: wallet.address,
      userToMint: [
        {
          investorEmail: "sirmos34@gmail.com",
          investorAddress: wallet.address,
          amount: "500",
          needWhitelist: true,
        },
      ],
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Prepare failed: " + JSON.stringify(data));
  return data;
}

async function send(txId, tx) {
  const signed = await wallet.signTransaction(tx);
  const res = await fetch(`${BASE_URL}/send-transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify({ txId, signedTransactions: [signed] }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Send failed: " + JSON.stringify(data));
  return data;
}

async function main() {
  const prepared = await prepare();

  console.log("Sending whitelist transaction...");
  const whitelistResult = await send(prepared.txIdWhitelist, prepared.whitelistTx);
  console.log(JSON.stringify(whitelistResult, null, 2));

  console.log("Sending mint transaction...");
  const mintResult = await send(prepared.txId, prepared.transactions);
  console.log(JSON.stringify(mintResult, null, 2));
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});

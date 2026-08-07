// Full Issuer Agent tokenization flow, done directly against the
// Dapp API rather than through MCP, since we know the exact field
// names now and this way we see every step clearly.

import "dotenv/config";
import { Wallet } from "ethers";

const BASE_URL = "https://api.sandbox.brickken.com";
const API_KEY = process.env.BRICKKEN_API_KEY;
const wallet = new Wallet(process.env.BRICKKEN_PRIVATE_KEY);

async function prepare() {
  const res = await fetch(`${BASE_URL}/prepare-transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      chainId: "11155111",
      method: "newTokenization",
      tokenizerEmail: "sirmos34@yahoo.com",
      signerAddress: wallet.address,
      name: "Brickwarden Property",
      tokenSymbol: "BWP",
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error("Prepare failed: " + JSON.stringify(data));
  }
  return data;
}

async function signAll(transactions) {
  const signed = [];
  for (const tx of transactions) {
    const signedTx = await wallet.signTransaction(tx);
    signed.push(signedTx);
  }
  return signed;
}

async function send(txId, signedTransactions) {
  const res = await fetch(`${BASE_URL}/send-transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ txId, signedTransactions }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error("Send failed: " + JSON.stringify(data));
  }
  return data;
}

async function main() {
  console.log("Preparing tokenization transaction...");
  const prepared = await prepare();
  console.log("txId:", prepared.txId);

  console.log("Signing", prepared.transactions.length, "transaction(s)...");
  const signedTransactions = await signAll(prepared.transactions);

  console.log("Sending signed transaction(s)...");
  const sent = await send(prepared.txId, signedTransactions);

  console.log("");
  console.log("Sent. Result:");
  console.log(JSON.stringify(sent, null, 2));
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});

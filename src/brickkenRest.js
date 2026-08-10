import { Wallet } from "ethers";

const BASE_URL = "https://api.sandbox.brickken.com";

export async function runIssuerAction(payload) {
  const API_KEY = process.env.BRICKKEN_API_KEY;
  const wallet = new Wallet(process.env.BRICKKEN_PRIVATE_KEY);

  console.log(`Preparing ${payload.method}...`);
  const prepareRes = await fetch(`${BASE_URL}/prepare-transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(payload),
  });

  const prepared = await prepareRes.json();
  if (!prepareRes.ok) {
    throw new Error("Prepare failed: " + JSON.stringify(prepared));
  }

  const txList = Array.isArray(prepared.transactions)
    ? prepared.transactions
    : [prepared.transactions];

  console.log("txId:", prepared.txId);
  console.log(`Signing ${txList.length} transaction(s)...`);

  const signedTransactions = [];
  for (const tx of txList) {
    signedTransactions.push(await wallet.signTransaction(tx));
  }

  console.log("Sending signed transaction(s)...");
  const sendRes = await fetch(`${BASE_URL}/send-transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ txId: prepared.txId, signedTransactions }),
  });

  const sent = await sendRes.json();
  if (!sendRes.ok) {
    throw new Error("Send failed: " + JSON.stringify(sent));
  }

  return sent;
}

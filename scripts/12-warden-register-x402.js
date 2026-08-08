import "dotenv/config";
import { wrapFetchWithPaymentFromConfig } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount(process.env.BRICKKEN_PRIVATE_KEY);

const fetchWithPayment = wrapFetchWithPaymentFromConfig(fetch, {
  schemes: [
    {
      network: "eip155:11155111",
      client: new ExactEvmScheme(account),
    },
  ],
});

async function main() {
  console.log("Calling agentRegister, paying via x402 automatically...");

  const response = await fetchWithPayment("https://api.sandbox.brickken.com/prepare-transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chainId: "11155111",
      method: "agentRegister",
      signerAddress: "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb",
      email: "sirmos34@yahoo.com",
    }),
  });

  const data = await response.json();
  console.log("Status:", response.status);
  console.log(JSON.stringify(data, null, 2));
}

main().catch((err) => console.error("Failed:", err.message));

import "dotenv/config";
import { createPublicClient, http, formatUnits } from "viem";
import { sepolia } from "viem/chains";

const PAYMENT_TOKEN = "0x28d2B01854D0aBec267a3DDcad9163580E6E8604";
const WALLET = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";

const erc20Abi = [
  { name: "symbol", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
  { name: "decimals", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint8" }] },
  { name: "balanceOf", type: "function", stateMutability: "view", inputs: [{ type: "address" }], outputs: [{ type: "uint256" }] },
];

const client = createPublicClient({
  chain: sepolia,
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
});

async function main() {
  const symbol = await client.readContract({ address: PAYMENT_TOKEN, abi: erc20Abi, functionName: "symbol" });
  const decimals = await client.readContract({ address: PAYMENT_TOKEN, abi: erc20Abi, functionName: "decimals" });
  const balance = await client.readContract({ address: PAYMENT_TOKEN, abi: erc20Abi, functionName: "balanceOf", args: [WALLET] });
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals);
  console.log("Balance:", formatUnits(balance, decimals));
}

main();

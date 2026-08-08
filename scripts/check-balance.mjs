import { createPublicClient, http, formatUnits } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
});

const WALLET = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";
const TOKENS = {
  USDC: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  EURC: "0x08210F9170F89Ab7658F0B5E3fF39b0E03C594D4",
  USDT: "0x28d2B01854D0aBec267a3DDcad9163580E6E8604",
};

const abi = [{
  name: "balanceOf", type: "function", stateMutability: "view",
  inputs: [{ name: "owner", type: "address" }],
  outputs: [{ name: "", type: "uint256" }],
}];

for (const [label, addr] of Object.entries(TOKENS)) {
  const bal = await client.readContract({ address: addr, abi, functionName: "balanceOf", args: [WALLET] });
  console.log(`${label}: ${formatUnits(bal, 6)}`);
}

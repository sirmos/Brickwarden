import { createPublicClient, http, formatUnits } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
});

const USDT = "0x28d2B01854D0aBec267a3DDcad9163580E6E8604";
const WALLET = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";
const ESCROW = "0x88Ca6e0821E8Fa4dE09084d27e41A50693188FE7";

const abi = [{
  name: "allowance", type: "function", stateMutability: "view",
  inputs: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
  ],
  outputs: [{ name: "", type: "uint256" }],
}];

async function main() {
  const val = await client.readContract({
    address: USDT, abi, functionName: "allowance", args: [WALLET, ESCROW],
  });
  console.log("Current allowance:", formatUnits(val, 6), "USDT");
}
main();

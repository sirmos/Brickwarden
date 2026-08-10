import { createPublicClient, http, formatUnits } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
});

const WALLET = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";
const ESCROW = "0x88Ca6e0821E8Fa4dE09084d27e41A50693188FE7";
const USDC = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const EURC = "0x08210F9170F89Ab7658F0B5E3fF39b0E03C594D4";

const abi = [{
  name: "allowance", type: "function", stateMutability: "view",
  inputs: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
  ],
  outputs: [{ name: "", type: "uint256" }],
}];

async function main() {
  const usdcVal = await client.readContract({
    address: USDC, abi, functionName: "allowance", args: [WALLET, ESCROW],
  });
  console.log("USDC allowance:", formatUnits(usdcVal, 6));

  const eurcVal = await client.readContract({
    address: EURC, abi, functionName: "allowance", args: [WALLET, ESCROW],
  });
  console.log("EURC allowance:", formatUnits(eurcVal, 6));
}
main();

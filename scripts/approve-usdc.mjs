import "dotenv/config";
import { createWalletClient, createPublicClient, http, parseUnits, formatUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

const RPC = "https://ethereum-sepolia-rpc.publicnode.com";
const USDC = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const ESCROW = "0x88Ca6e0821E8Fa4dE09084d27e41A50693188FE7";

const account = privateKeyToAccount(process.env.BRICKKEN_PRIVATE_KEY);

const publicClient = createPublicClient({ chain: sepolia, transport: http(RPC) });
const walletClient = createWalletClient({ account, chain: sepolia, transport: http(RPC) });

const approveAbi = [{
  name: "approve", type: "function", stateMutability: "nonpayable",
  inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }],
  outputs: [{ name: "", type: "bool" }],
}];
const allowanceAbi = [{
  name: "allowance", type: "function", stateMutability: "view",
  inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }],
  outputs: [{ name: "", type: "uint256" }],
}];

async function main() {
  console.log("Approving 1000 USDC to escrow...");
  const approveHash = await walletClient.writeContract({
    address: USDC, abi: approveAbi, functionName: "approve",
    args: [ESCROW, parseUnits("1000", 6)],
  });
  await publicClient.waitForTransactionReceipt({ hash: approveHash });
  console.log("Approve confirmed:", approveHash);

  const updated = await publicClient.readContract({
    address: USDC, abi: allowanceAbi, functionName: "allowance",
    args: [account.address, ESCROW],
  });
  console.log("New USDC allowance:", formatUnits(updated, 6));
}

main().catch((err) => {
  console.error("Failed:", err.shortMessage || err.message);
  process.exit(1);
});

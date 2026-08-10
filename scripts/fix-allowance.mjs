import "dotenv/config";
import { createWalletClient, createPublicClient, http, parseUnits, formatUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

const RPC = "https://ethereum-sepolia-rpc.publicnode.com";
const USDT = "0x28d2B01854D0aBec267a3DDcad9163580E6E8604";
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
  const current = await publicClient.readContract({
    address: USDT, abi: allowanceAbi, functionName: "allowance",
    args: [account.address, ESCROW],
  });
  console.log("Current allowance:", formatUnits(current, 6), "USDT");

  if (current > 0n) {
    console.log("Resetting allowance to 0 first...");
    const resetHash = await walletClient.writeContract({
      address: USDT, abi: approveAbi, functionName: "approve",
      args: [ESCROW, 0n],
    });
    await publicClient.waitForTransactionReceipt({ hash: resetHash });
    console.log("Reset confirmed:", resetHash);
  }

  console.log("Approving 100,000 USDT to escrow...");
  const approveHash = await walletClient.writeContract({
    address: USDT, abi: approveAbi, functionName: "approve",
    args: [ESCROW, parseUnits("100000", 6)],
  });
  await publicClient.waitForTransactionReceipt({ hash: approveHash });
  console.log("Approve confirmed:", approveHash);

  const updated = await publicClient.readContract({
    address: USDT, abi: allowanceAbi, functionName: "allowance",
    args: [account.address, ESCROW],
  });
  console.log("New allowance:", formatUnits(updated, 6), "USDT");
}

main().catch((err) => {
  console.error("Failed:", err.shortMessage || err.message);
  process.exit(1);
});

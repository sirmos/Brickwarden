import "dotenv/config";
import { createWalletClient, createPublicClient, http, parseUnits, formatUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

const USDT = "0x28d2B01854D0aBec267a3DDcad9163580E6E8604";
const WALLET_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";
const ESCROW = "0x88Ca6e0821E8Fa4dE09084d27e41A50693188FE7";

const account = privateKeyToAccount(process.env.BRICKKEN_PRIVATE_KEY);
const publicClient = createPublicClient({ chain: sepolia, transport: http("https://ethereum-sepolia-rpc.publicnode.com") });
const walletClient = createWalletClient({ account, chain: sepolia, transport: http("https://ethereum-sepolia-rpc.publicnode.com") });

const mintAbi = [{
  name: "mint", type: "function", stateMutability: "nonpayable",
  inputs: [{ name: "to", type: "address" }, { name: "amount", type: "uint256" }],
  outputs: [],
}];

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
  console.log("Minting 50,000 test USDT to wallet...");
  const mintHash = await walletClient.writeContract({
    address: USDT, abi: mintAbi, functionName: "mint",
    args: [WALLET_ADDRESS, parseUnits("50000", 6)],
  });
  await publicClient.waitForTransactionReceipt({ hash: mintHash });
  console.log("Mint confirmed:", mintHash);

  console.log("Approving 50,000 USDT allowance to", ESCROW, "...");
  const approveHash = await walletClient.writeContract({
    address: USDT, abi: approveAbi, functionName: "approve",
    args: [ESCROW, parseUnits("50000", 6)],
  });
  await publicClient.waitForTransactionReceipt({ hash: approveHash });
  console.log("Approve confirmed:", approveHash);

  const val = await publicClient.readContract({
    address: USDT, abi: allowanceAbi, functionName: "allowance", args: [WALLET_ADDRESS, ESCROW],
  });
  console.log("New allowance:", formatUnits(val, 6), "USDT");
}

main().catch((err) => {
  console.error("Failed:", err.shortMessage || err.message);
  process.exit(1);
});

import "dotenv/config";
import { createWalletClient, createPublicClient, http, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

const USDT = "0x28d2B01854D0aBec267a3DDcad9163580E6E8604";
const WALLET_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";

const account = privateKeyToAccount(process.env.BRICKKEN_PRIVATE_KEY);

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
});

const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
});

const abi = [{
  name: "mint", type: "function", stateMutability: "nonpayable",
  inputs: [
    { name: "to", type: "address" },
    { name: "amount", type: "uint256" },
  ],
  outputs: [],
}];

async function main() {
  const hash = await walletClient.writeContract({
    address: USDT,
    abi,
    functionName: "mint",
    args: [WALLET_ADDRESS, parseUnits("100", 6)],
  });
  console.log("Mint tx sent:", hash);
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("Status:", receipt.status);
}

main().catch((err) => {
  console.error("Mint attempt failed:", err.shortMessage || err.message);
  process.exit(1);
});

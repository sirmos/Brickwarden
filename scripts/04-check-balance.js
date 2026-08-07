import "dotenv/config";
import { ethers } from "ethers";

// Public Sepolia RPC, free to use, no key needed for read-only calls
const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");

async function main() {
  const address = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";
  const balance = await provider.getBalance(address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");
}

main().catch((err) => {
  console.error("Failed to check balance:", err.message);
});

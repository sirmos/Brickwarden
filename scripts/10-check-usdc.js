import "dotenv/config";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // Circle's official Sepolia USDC
const ERC20_ABI = ["function balanceOf(address) view returns (uint256)", "function decimals() view returns (uint8)"];

async function main() {
  const contract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider);
  const balance = await contract.balanceOf("0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb");
  console.log("USDC balance:", ethers.formatUnits(balance, 6));
}

main().catch((err) => console.error("Failed:", err.message));

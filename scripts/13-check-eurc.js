import "dotenv/config";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
const EURC_ADDRESS = "0xd887e26968451ddDbe05B3532E43Cca7568e9683";
const ERC20_ABI = ["function balanceOf(address) view returns (uint256)", "function decimals() view returns (uint8)"];

async function main() {
  const contract = new ethers.Contract(EURC_ADDRESS, ERC20_ABI, provider);
  const decimals = await contract.decimals();
  const balance = await contract.balanceOf("0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb");
  console.log("EURC balance:", ethers.formatUnits(balance, decimals));
}

main().catch((err) => console.error("Failed:", err.message));

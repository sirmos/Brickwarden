import { createPublicClient, http, formatEther } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
});

const WALLET = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";

async function main() {
  const balance = await client.getBalance({ address: WALLET });
  console.log("ETH balance:", formatEther(balance), "ETH");
}
main();

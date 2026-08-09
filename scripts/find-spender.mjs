import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
});

const mintTxHash = "0xc5e08c615792057a71fb705fbe870b9f2dc50caecc44b3ee4129bd390ae3a80b";

async function main() {
  const tx = await client.getTransaction({ hash: mintTxHash });
  console.log("BWP token / STO contract address:", tx.to);
}

main().catch((err) => {
  console.error("Lookup failed:", err.shortMessage || err.message);
  process.exit(1);
});

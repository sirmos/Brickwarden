import "dotenv/config";
import { openWardenSession } from "../src/mcpClient.js";
import { registerWardenIdentity } from "../src/warden.js";

const WALLET_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";

async function main() {
  const client = await openWardenSession();

  const result = await registerWardenIdentity(client, {
    chainId: "11155111",
    signerAddress: WALLET_ADDRESS,
  });

  console.log("");
  console.log("Warden registration result:");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Warden registration failed:", err.message);
  process.exit(1);
});

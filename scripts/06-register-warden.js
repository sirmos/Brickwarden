import "dotenv/config";
import fs from "fs";
import { openWardenSession } from "../src/mcpClient.js";

const WALLET_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";

async function main() {
  const client = await openWardenSession();

  const result = await client.callTool({
    name: "agent_register",
    arguments: {
      chainId: "11155111",
      signerAddress: WALLET_ADDRESS,
    },
  });

  fs.writeFileSync("warden-error.json", JSON.stringify(result, null, 2));
  console.log("Full result saved, run: cat warden-error.json");
}

main().catch((err) => {
  fs.writeFileSync("warden-error.json", JSON.stringify({ message: err.message, stack: err.stack }, null, 2));
  console.log("Error saved, run: cat warden-error.json");
});

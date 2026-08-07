// This prints the exact input fields Brickken expects for each tool,
// straight from the server. We run this once so we stop guessing
// field names when we build the real demo.

import "dotenv/config";
import { openBrickkenSession } from "../src/mcpClient.js";

async function main() {
  const client = await openBrickkenSession({
    env: process.env.BRICKKEN_ENV || "sandbox",
    apiKey: process.env.BRICKKEN_API_KEY,
  });

  const { tools } = await client.listTools();

  const wanted = [
    "create_tokenization",
    "create_sto",
    "mint_tokens",
    "whitelist_investor",
    "burn_tokens",
    "distribute_dividend",
  ];

  for (const tool of tools) {
    if (wanted.includes(tool.name)) {
      console.log("");
      console.log("TOOL:", tool.name);
      console.log(JSON.stringify(tool.inputSchema, null, 2));
    }
  }
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});

// Run this first, before anything else.
// It just checks we can reach Brickken's MCP server and that our
// API key is accepted. Nothing gets created or spent yet.

import "dotenv/config";
import { openBrickkenSession, callTool } from "../src/mcpClient.js";

async function main() {
  console.log("Connecting to Brickken as the Issuer Agent (API key session)...");

  const issuerClient = await openBrickkenSession({
    env: process.env.BRICKKEN_ENV || "sandbox",
    apiKey: process.env.BRICKKEN_API_KEY,
  });

  const issuerConfig = await callTool(issuerClient, "get_config", {});
  console.log("Issuer session config:", issuerConfig);

  console.log("");
  console.log("Connecting to Brickken as the Warden Agent (wallet session)...");

  const wardenClient = await openBrickkenSession({
    env: process.env.BRICKKEN_ENV || "sandbox",
    privateKey: process.env.BRICKKEN_PRIVATE_KEY,
    apiKey: "",
  });

  const wardenConfig = await callTool(wardenClient, "get_config", {});
  console.log("Warden session config:", wardenConfig);

  console.log("");
  console.log("Both sessions connected. You are ready to build.");
}

main().catch((err) => {
  console.error("Connection check failed:", err.message);
  process.exit(1);
});

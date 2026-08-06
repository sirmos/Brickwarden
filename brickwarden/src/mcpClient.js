// This file opens a connection to the Brickken MCP server and gives us
// one simple function to call any tool on it.
// Docs: https://mcp.brickken.com/

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const MCP_URL = "https://mcp.brickken.com/mcp";

// Opens a fresh connection and returns a ready-to-use client.
// We open a new one per session type since the issuer session (API key)
// and the warden session (private key) need separate configure calls.
export async function openBrickkenSession(configPayload) {
  const transport = new StreamableHTTPClientTransport(new URL(MCP_URL));
  const client = new Client({ name: "brickwarden", version: "1.0.0" });

  await client.connect(transport);

  // Every session must call configure first, before any other tool works.
  await client.callTool({
    name: "configure",
    arguments: configPayload,
  });

  return client;
}

// Small helper so the rest of our code does not repeat the same
// try or catch and result unwrapping every time.
export async function callTool(client, toolName, args) {
  const result = await client.callTool({
    name: toolName,
    arguments: args,
  });

  if (result.isError) {
    throw new Error(`Tool ${toolName} failed: ${JSON.stringify(result.content)}`);
  }

  return result.content;
}

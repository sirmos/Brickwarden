// Warden Agent
// This wraps the Agentic API tools the Warden needs: an on-chain
// identity, and later, the enforcement actions it takes when a
// compliance trigger fires.

import { callTool } from "./mcpClient.js";

export async function registerWardenIdentity(client, agentDetails) {
  console.log("Warden: registering agent identity");
  return callTool(client, "agent_register", agentDetails);
}

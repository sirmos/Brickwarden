// Issuer Agent
// This wraps the Dapp API tools we need for the tokenization and
// STO lifecycle. Each function just calls one MCP tool and returns
// the plain result, so the demo script stays easy to read.

import { callTool } from "./mcpClient.js";

export async function tokenizeAsset(client, assetDetails) {
  console.log("Issuer: creating tokenization for", assetDetails.name);
  return callTool(client, "create_tokenization", assetDetails);
}

export async function createSto(client, stoDetails) {
  console.log("Issuer: creating STO");
  return callTool(client, "create_sto", stoDetails);
}

export async function mintTokens(client, mintDetails) {
  console.log("Issuer: minting tokens", mintDetails);
  return callTool(client, "mint_tokens", mintDetails);
}

export async function whitelistInvestor(client, investorDetails) {
  console.log("Issuer: whitelisting investor", investorDetails.investorAddress);
  return callTool(client, "whitelist_investor", investorDetails);
}

export async function burnTokens(client, burnDetails) {
  console.log("Issuer: burning tokens", burnDetails);
  return callTool(client, "burn_tokens", burnDetails);
}

export async function distributeDividend(client, dividendDetails) {
  console.log("Issuer: distributing dividend", dividendDetails);
  return callTool(client, "distribute_dividend", dividendDetails);
}

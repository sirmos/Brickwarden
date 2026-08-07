# Brickwarden

Brickwarden pairs two agents around one tokenized asset:

- **Issuer Agent** creates the asset, runs the STO, mints tokens, whitelists investors, distributes dividends. Uses the Brickken Dapp API (API key).
- **Warden Agent** watches for compliance triggers (KYC expiry, sanctions flags, risk events) and freezes or burns tokens when one fires. Uses the Brickken Agentic API (wallet, x402).

Both agents act on the same asset. The Issuer builds it, the Warden protects it.

## Surfaces used

- MCP (hosted Brickken MCP server, https://mcp.brickken.com/mcp)
- REST (used for debugging only, see below)

## Methods called

(filled in as we go)

## Network

Ethereum Sepolia, chainId 11155111

## Wallet used for this build

0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb

## Transaction hashes

(filled in as we go)

## AI tool disclosure

This project was built with help from Claude (Anthropic) as a coding assistant, for writing and debugging code, and researching Brickken's API. All architecture decisions, testing, and running of the code was done by the developer.

## Team

Sirmos (solo)

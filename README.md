# Brickwarden

Tokenized assets get built. They rarely get watched.

Most issuance tooling stops the moment tokens are minted. Brickwarden pairs two independent agents around one tokenized asset: one that builds it, and one that never stops watching it.

- **Issuer Agent**: creates the asset, launches the offering, whitelists the investor, mints tokens, and pays out dividends. Uses the Brickken Dapp API over REST.
- **Warden Agent**: has its own on-chain identity, separate from the Issuer, and watches the asset for compliance triggers. When one fires, it signs and sends its own enforcement transaction, with no approval step from the Issuer. The response is matched to severity: a low or medium severity trigger revokes the investor's whitelist status, a high severity trigger burns the tokens outright.

The Issuer grows the asset. The Warden protects it. Neither needs the other to act.

**Try it live: [sirmos.github.io/Brickwarden](https://sirmos.github.io/Brickwarden/)**
The page replays all nine transactions below in order, on autoplay or step by step, each one linking straight to Etherscan.

## How it works

1. The Issuer Agent runs the full lifecycle of a tokenized offering: tokenize, launch, whitelist, mint, distribute.
2. The Warden Agent registers its own identity under ERC-8004, independent of the Issuer's.
3. `src/triggers.js` defines three compliance trigger types. `src/warden.js` reads the trigger, decides the response by severity, and signs the transaction itself.
4. Every Warden action is written to `logs/warden-actions.json`: trigger type, severity, reason, investor, and transaction hash. Nothing is enforced off-chain and left unlogged.

## Surfaces used

- **REST (Brickken Dapp API)**: every prepare, sign, and send call, for both agents.
- **Agentic API (ERC-8004)**: used once, to register the Warden Agent's on-chain identity, separate from the Issuer's.
- **MCP**: tried first for tokenization. Its tool schema had a wrong field name (`tokenName` instead of `name`), so the build moved to REST directly for every executed call. Details in [`known-issues.md`](./known-issues.md).

## Methods called

`newTokenization` · `newSto` · `whitelist` · `mintToken` · `dividendDistribution` · `agentRegister` · `burnToken`

## Network

Ethereum Sepolia, chainId `11155111`

## Wallet used for this build

`0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb`

## Transaction hashes

**Issuer Agent, full lifecycle**

1. Tokenize BWP (`newTokenization`)
   `0x7f2ad65ffa13bd3d0b2206cb7fbb6531d15429a73b093786750b1f525bdd6bdc`
2. Launch the offering, Brickwarden Property Round 1 (`newSto`)
   `0xbc902502307fa03959894172ec712eaefc88e9713ddcddf8bddc8a8ceefee6e2`
3. Whitelist the investor (`whitelist`)
   `0xc86e965ce9e78fc0302dee141898d75f0501e54f9e167dc0e53c0e16098b5928`
4. Mint 500 BWP (`mintToken`)
   `0xc5e08c615792057a71fb705fbe870b9f2dc50caecc44b3ee4129bd390ae3a80b`
5. Distribute USDT dividends to BWP holders (`dividendDistribution`)
   `0xb7eebf9bcff6288ea92c0620fc93cd94e2144135a98b8c9cf4deb61cd995a146`

**Warden Agent, identity and full enforcement range**

6. Register on-chain identity, ERC-8004 (`agentRegister`)
   `0x8dad86652161d2f2067b335d0b4397dce22bacf011eb89e7d552efa0b8711a5c`
7. Trigger: KYC expired, medium severity, revoke whitelist (`whitelist`)
   `0x55ba9cdf0796831e049f50d8e94f029d3f44ae60854598d2f653812ede2e972a`
8. Trigger: sanctions flag, high severity, burn tokens (`burnToken`)
   `0x7c54e351a1815d03c3fba054ec603598244303ae4c64bd33d85a4f3ada41dc48`
9. Trigger: jurisdiction change, low severity, revoke whitelist (`whitelist`)
   `0xbe937ee515a9021d7fcfdee06f4098d09fb7aab6773b0b29dbda84d559e1aba0`

**Note on one earlier attempt**: an early `newSto` call reverted on chain because its start date was already in the past by the time the transaction was mined (`0x928c7e0816227113caa14289597a93bff74b81c8d63145bc51806842b7a6af31`, status 0, confirmed with Brickken support). Listed here for transparency. Not counted as a working step. Transaction 2 above is the corrected call that succeeded.

## Known issues found

A few places where Brickken's MCP schema, OpenAPI docs, and live API disagreed with each other, including the `dividendDistribution` allowance requirement and the correct spender address. Full list, with the field names and the fix for each, in [`known-issues.md`](./known-issues.md). All confirmed with Brickken support during the build.

## Built for

Brickken's Build with Brickken campaign (Aug 7 to Sep 17, 2026). The Brickken integration, both agents, and the live replay site were built during the campaign window.

## AI tool disclosure

This project was built with Claude (Anthropic) as a development assistant. All testing, transaction execution, and decision-making on the project's direction were done by the developer.

## Team

Sirmos (solo)

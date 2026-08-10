# Brickwarden

Brickwarden pairs two agents around one tokenized asset:

- **Issuer Agent**: creates the asset, runs the STO, mints tokens, whitelists investors, and distributes dividends. Uses the Brickken Dapp API over REST.
- **Warden Agent**: watches for compliance triggers (KYC expiry, sanctions flags, jurisdiction changes) and revokes access or burns tokens when one fires. Uses the Brickken Agentic API for its identity, and the same REST API as the Issuer for its enforcement actions.

Both agents act on the same asset. The Issuer builds it, the Warden protects it.

Try it live: https://sirmos.github.io/Brickwarden/ (replays every confirmed transaction below, in order)

## Surfaces used

- REST (Brickken Dapp API): used for every prepare, sign, and send call, for both agents.
- Agentic API (ERC-8004): used once, to register the Warden Agent's on-chain identity.
- MCP was tried first for tokenization. Its schema had a wrong field name (`tokenName` instead of `name`), so the build moved to REST directly. MCP was not used for any executed transaction.

## Methods called

- newTokenization
- newSto
- whitelist
- mintToken
- agentRegister
- burnToken
- dividendDistribution

## Network

Ethereum Sepolia, chainId 11155111

## Wallet used for this build

0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb

## Transaction hashes

**Issuer Agent**

1. Tokenize BWP (newTokenization)
   `0x7f2ad65ffa13bd3d0b2206cb7fbb6531d15429a73b093786750b1f525bdd6bdc`
2. Launch the offering, Brickwarden Property Round 1 (newSto)
   `0xbc902502307fa03959894172ec712eaefc88e9713ddcddf8bddc8a8ceefee6e2`
3. Whitelist the investor (whitelist)
   `0xc86e965ce9e78fc0302dee141898d75f0501e54f9e167dc0e53c0e16098b5928`
4. Mint 500 BWP (mintToken)
   `0xc5e08c615792057a71fb705fbe870b9f2dc50caecc44b3ee4129bd390ae3a80b`

**Warden Agent**

6. Register on-chain identity, ERC-8004 (agentRegister)
   `0x8dad86652161d2f2067b335d0b4397dce22bacf011eb89e7d552efa0b8711a5c`
7. Trigger: KYC expired, medium severity, revoke whitelist (whitelist)
   `0x55ba9cdf0796831e049f50d8e94f029d3f44ae60854598d2f653812ede2e972a`
8. Trigger: sanctions flag, high severity, burn tokens (burnToken)
   `0x7c54e351a1815d03c3fba054ec603598244303ae4c64bd33d85a4f3ada41dc48`
9. Trigger: jurisdiction change, low severity, revoke whitelist (whitelist)
   `0xbe937ee515a9021d7fcfdee06f4098d09fb7aab6773b0b29dbda84d559e1aba0`

**Note on one earlier attempt**: an early newSto call reverted on chain because its start date was already in the past by the time the transaction was mined (`0x928c7e0816227113caa14289597a93bff74b81c8d63145bc51806842b7a6af31`, status 0, confirmed with Brickken support). It is listed here for transparency. It is not counted as a working step. Transaction 2 above is the corrected call that succeeded.

## AI tool disclosure

This project was built with Claude (Anthropic) as a development assistant. All testing, transaction execution, and decision-making on the project's direction were done by the developer.

## Team

Sirmos (solo)

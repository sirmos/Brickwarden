# Known field name mismatches found during this build

While building Brickwarden, we found a few places where Brickken's
MCP tool schema, their OpenAPI docs, and their actual live API
disagreed with each other. Logged here in case it helps other
developers or Brickken's own team.

1. newTokenization: MCP tool schema said `tokenName`, actual API
   field is `name`. Confirmed by Brickken support.

2. mintToken: OpenAPI example shows `email` inside `userToMint`
   items, but the live API rejects that and requires `investorEmail`
   instead, matching the field name used elsewhere (whitelist, STO).

3. mintToken: even with the correct field name, requests to mint
   BWP2 (a token we successfully created and ran an STO for on the
   same account) fail with "No company found with this token
   symbol". Reported to Brickken support, response pending.

5. dividendDistribution checks a USDT allowance from the signer wallet to the BWP STO token contract. Not the escrow contract, and not USDC or EURC. Get the correct spender address from GET /get-tokenizer-info?tokenSymbol=BWP, field tokenAddress. Confirmed with Brickken support and fixed.

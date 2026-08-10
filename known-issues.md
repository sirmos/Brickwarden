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
   symbol". This turned out to be user error: BWP2 was an abandoned
   test symbol, not an active company record.

4. dividendDistribution checks a USDT allowance from the signer
   wallet to the escrow contract, not the BWP STO token contract,
   and not USDC or EURC. Get the correct spender address from
   `GET /get-tokenizer-info?tokenSymbol=BWP`, field `escrowAddress`.
   The approve call also needed `tokenizerAddress` in the payload,
   which returned a "User not found" error until Brickken fixed a
   backend bug on their side. Confirmed with Brickken support and
   fixed.

5. burnToken: same pattern as issue 2, the field is `investorEmail`,
   required even though it is easy to miss in the docs example.

6. runIssuerAction's response shape is not always an array.
   `transactions` comes back as a single object instead of an array
   specifically when `needWhitelist: true` is sent for an investor
   who is already whitelisted. Fixed by checking with
   `Array.isArray` before looping.

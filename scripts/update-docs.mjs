import { readFileSync, writeFileSync, appendFileSync } from "fs";

let readme = readFileSync("README.md", "utf8");

readme = readme.replace(
  "- burnToken",
  "- burnToken\n- dividendDistribution"
);

readme = readme.replace(
  "4. Mint 500 BWP (mintToken)\n`0xc5e08c615792057a71fb705fbe870b9f2dc50caecc44b3ee4129bd390ae3a80b`",
  "4. Mint 500 BWP (mintToken)\n`0xc5e08c615792057a71fb705fbe870b9f2dc50caecc44b3ee4129bd390ae3a80b`\n5. Distribute dividends (dividendDistribution)\n`0xb7eebf9bcff6288ea92c0620fc93cd94e2144135a98b8c9cf4deb61cd995a146`"
);

readme = readme.replace("5. Register on-chain identity", "6. Register on-chain identity");
readme = readme.replace("6. Trigger: KYC expired", "7. Trigger: KYC expired");
readme = readme.replace("7. Trigger: sanctions flag", "8. Trigger: sanctions flag");
readme = readme.replace("8. Trigger: jurisdiction change", "9. Trigger: jurisdiction change");

writeFileSync("README.md", readme);

const entry = "\n5. dividendDistribution checks a USDT allowance from the signer wallet to the BWP STO token contract. Not the escrow contract, and not USDC or EURC. Get the correct spender address from GET /get-tokenizer-info?tokenSymbol=BWP, field tokenAddress. Confirmed with Brickken support and fixed.\n";

appendFileSync("known-issues.md", entry);

console.log("Done. README.md and known-issues.md updated.");

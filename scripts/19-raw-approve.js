import "dotenv/config";

async function main() {
  const res = await fetch(
    "https://api.sandbox.brickken.com/prepare-transactions/approve",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.BRICKKEN_API_KEY,
      },
      body: JSON.stringify({
        method: "approve",
        chainId: "11155111",
        tokenSymbol: "USDT",
        signerAddress: "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb",
        tokenizerAddress: "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb",
        tokenizerEmail: "sirmos34@yahoo.com",
        spenderAddress: "0x88Ca6e0821E8Fa4dE09084d27e41A50693188FE7",
        amount: "100",
      }),
    }
  );
  const data = await res.json();
  console.log("Status:", res.status);
  console.log(JSON.stringify(data, null, 2));
}

main().catch((err) => {
  console.error("Raw request failed:", err.message);
  process.exit(1);
});

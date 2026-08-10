import "dotenv/config";

async function main() {
  const res = await fetch("https://api.sandbox.brickken.com/prepare-transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.BRICKKEN_API_KEY,
    },
    body: JSON.stringify({
      chainId: "11155111",
      method: "mintToken",
      tokenSymbol: "BWP",
      signerAddress: "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb",
      userToMint: [
        {
          investorEmail: "sirmos34@gmail.com",
          investorAddress: "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb",
          amount: "500",
          needWhitelist: true,
        },
      ],
    }),
  });
  const data = await res.json();
  console.log("Status:", res.status);
  console.log(JSON.stringify(data, null, 2));
}

main().catch((err) => {
  console.error("Raw check failed:", err.message);
});

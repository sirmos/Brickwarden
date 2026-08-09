import "dotenv/config";

async function main() {
  const res = await fetch(
    "https://api.sandbox.brickken.com/get-tokenizer-info?tokenSymbol=BWP",
    {
      headers: {
        "x-api-key": process.env.BRICKKEN_API_KEY,
      },
    }
  );
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

main().catch((err) => {
  console.error("Lookup failed:", err.message);
  process.exit(1);
});

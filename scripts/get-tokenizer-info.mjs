import "dotenv/config";

const BASE_URL = "https://api.sandbox.brickken.com";
const API_KEY = process.env.BRICKKEN_API_KEY;

async function main() {
  const res = await fetch(
    `${BASE_URL}/get-tokenizer-info?tokenSymbol=BWP`,
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

main();

import "dotenv/config";
import { Wallet } from "ethers";

const key = process.env.BRICKKEN_PRIVATE_KEY;

if (!key) {
  console.log("BRICKKEN_PRIVATE_KEY is empty. Check your .env file has it set, with no quotes and no spaces around the =");
  process.exit(1);
}

const wallet = new Wallet(key);
console.log("This key belongs to address:");
console.log(wallet.address);

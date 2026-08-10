import "dotenv/config";
import { createWalletClient, createPublicClient, http, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

const USDT = "0x28d2B01854D0aBec267a3DDcad9163580E6E8604";
const SPENDER = "0xB3E80Fcb49aACF28C94B7130D268Af055993d43B"; // BWP STO token contract, confirmed via get-tokenizer-info
const APPROVE_AMOUNT = "1000"; // human units, will be scaled by decimals below

const erc20Abi = [
  { name: "approve", type: "function", stateMutability: "nonpayable", inputs: [{ type: "address" }, { type: "uint256" }], outputs: [{ type: "bool" }] },
  { name: "allowance", type: "function", stateMutability: "view", inputs: [{ type: "address" }, { type: "address" }], outputs: [{ type: "uint256" }] },
];

const account = privateKeyToAccount(process.env.BRICKKEN_PRIVATE_KEY);

const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
});

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
});

async function main() {
  const decimals = 6; // confirmed via check-payment-token.mjs
  const amount = parseUnits(APPROVE_AMOUNT, decimals);

  console.log(`Approving ${APPROVE_AMOUNT} USDT from ${account.address} to spender ${SPENDER}...`);

  const hash = await walletClient.writeContract({
    address: USDT,
    abi: erc20Abi,
    functionName: "approve",
    args: [SPENDER, amount],
  });

  console.log("Tx sent:", hash);
  console.log("Waiting for confirmation...");

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log("Status:", receipt.status);

  const allowance = await publicClient.readContract({
    address: USDT,
    abi: erc20Abi,
    functionName: "allowance",
    args: [account.address, SPENDER],
  });
  console.log("New allowance:", allowance.toString());
}

main();

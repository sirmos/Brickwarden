// Run this once to create a fresh test wallet for the hackathon.
// This is only for testnet use. Never use a wallet made this way
// for real funds.

import { Wallet } from "ethers";

const wallet = Wallet.createRandom();

console.log("Wallet address (safe to share):");
console.log(wallet.address);
console.log("");
console.log("Private key (put this in .env only, never share it):");
console.log(wallet.privateKey);

import fs from "fs";

const headers = fs.readFileSync("headers.txt", "utf-8");
const lines = headers.split("\n");

const line = lines.find(l => l.toLowerCase().startsWith("payment-required"));
const colonIndex = line.indexOf(":");
const token = line.slice(colonIndex + 1).trim();

// This is a single base64 blob, not a three part JWT, decode it directly.
const decoded = Buffer.from(token, "base64").toString("utf-8");
const parsed = JSON.parse(decoded);

console.log("Decoded payment requirements:");
console.log(JSON.stringify(parsed, null, 2));

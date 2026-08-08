import "dotenv/config";
import { runIssuerAction } from "../src/brickkenRest.js";

const WALLET_ADDRESS = "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb";

async function main() {
  const result = await runIssuerAction({
    chainId: "11155111",
    method: "agentRegister",
    signerAddress: WALLET_ADDRESS,
    email: "sirmos34@gmail.com",
    name: "Brickwarden Warden Agent",
    description: "Compliance agent that monitors a tokenized asset and freezes or burns tokens when a risk trigger fires.",
    image: "https://github.com/sirmos/Brickwarden",
    services: [
      { name: "compliance-monitoring", endpoint: "https://github.com/sirmos/Brickwarden" },
    ],
  });

  console.log("");
  console.log("Warden registration result:");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});

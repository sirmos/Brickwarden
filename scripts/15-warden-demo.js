import "dotenv/config";
import { checkForTrigger } from "../src/triggers.js";
import { enforceOnTrigger } from "../src/warden.js";

async function main() {
  console.log("Warden Agent: checking for compliance triggers...");
  const trigger = checkForTrigger();

  if (!trigger.fired) {
    console.log("Warden Agent: nothing to act on.");
    return;
  }

  await enforceOnTrigger(trigger);

  console.log("");
  console.log("Full audit trail saved to logs/warden-actions.json");
}

main().catch((err) => {
  console.error("Warden demo failed:", err.message);
  process.exit(1);
});

// Run with an event type to force a specific trigger, useful for a
// clean demo: node scripts/15-warden-demo.js sanctions_flag
// Run with no argument for a random trigger, simulating real
// monitoring where you do not control what happens next.

import "dotenv/config";
import { checkForTrigger } from "../src/triggers.js";
import { enforceOnTrigger } from "../src/warden.js";

async function main() {
  const forcedType = process.argv[2];

  console.log("Warden Agent: checking for compliance triggers...");
  const trigger = checkForTrigger(forcedType);

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

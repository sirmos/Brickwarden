// Mock compliance trigger feed.
// In a real deployment this would come from an actual KYC provider,
// a sanctions list API, or an on-chain oracle. For this demo, it
// simulates different kinds of events with different severity, so
// the Warden Agent can respond differently depending on what fired.

const MOCK_EVENTS = [
  {
    type: "kyc_expired",
    severity: "medium",
    investorEmail: "sirmos34@gmail.com",
    investorAddress: "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb",
    reason: "Investor KYC document expired, compliance review required before continued access.",
  },
  {
    type: "sanctions_flag",
    severity: "high",
    investorEmail: "sirmos34@gmail.com",
    investorAddress: "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb",
    reason: "Investor wallet flagged in a sanctions screening check, holdings must be removed immediately.",
  },
  {
    type: "jurisdiction_change",
    severity: "low",
    investorEmail: "sirmos34@gmail.com",
    investorAddress: "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb",
    reason: "Investor's declared jurisdiction changed to a region this offering is not registered in.",
  },
];

// Pass an eventType to force a specific trigger (useful for demos),
// or call with no argument to get a random one, simulating a real
// monitoring feed where you do not know what will happen next.
export function checkForTrigger(eventType) {
  const event = eventType
    ? MOCK_EVENTS.find((e) => e.type === eventType)
    : MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)];

  if (!event) {
    return { fired: false };
  }

  return {
    fired: true,
    ...event,
    detectedAt: new Date().toISOString(),
  };
}

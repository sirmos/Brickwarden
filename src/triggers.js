// Mock compliance trigger feed.
// In a real deployment this would come from an actual KYC provider,
// a sanctions list API, or an on-chain oracle. For this demo, it is
// a simple function the Warden calls to check if something needs
// its attention right now.

export function checkForTrigger() {
  // Simulates a KYC expiry event on our test investor.
  // Change or extend this to add more trigger types later
  // (sanctions hit, jurisdiction change, etc).
  return {
    fired: true,
    type: "kyc_expired",
    investorEmail: "sirmos34@gmail.com",
    investorAddress: "0x7FDc636B74Bb6AB9453a29de6d2Bd78Ead568bdb",
    reason: "Investor KYC document expired, compliance review required before continued access.",
    detectedAt: new Date().toISOString(),
  };
}

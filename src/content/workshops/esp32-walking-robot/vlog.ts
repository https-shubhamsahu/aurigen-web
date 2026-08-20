/**
 * Vlog challenge copy + empty public gallery seed.
 */

export const vlogMeta = {
  title: "ESP32 Walking Robot Vlog Challenge",
  description:
    "Create a 30-90 second vlog: BUILD. FAIL. DEBUG. WALK. Organized workshop by Robotics & Automation Club, TSEC.",
};

export const vlogBrief = {
  headline: "BUILD. FAIL. DEBUG. WALK.",
  support:
    "Make a 30-90 second mini-vlog of your robot journey. Show the real path, including failures.",
  beats: [
    "Before",
    "Building",
    "Failure",
    "Debugging",
    "First movement",
    "Final robot",
    "Competition",
  ],
  rules: [
    "Keep it between 30 and 90 seconds.",
    "Show at least one real failure and one fix.",
    "Credit the Robotics & Automation Club, TSEC as the workshop organizer.",
    "You do not need to mention Aurigen.",
    "Submit a public video URL (Instagram, YouTube, or Drive link you control).",
    "Consent is required before a vlog can appear in the public gallery.",
  ],
  categories: [
    "Best Vlog",
    "Best Story",
    "Best Technical Explanation",
    "Most Entertaining",
    "Best Transformation",
  ],
};

/**
 * Static fallback if the shared Sheet URL is unset.
 * Live gallery prefers approved rows from workshop-runtime GAS.
 */
export const seedApprovedVlogs: import("@/types/workshop-ecosystem").VlogSubmission[] =
  [];

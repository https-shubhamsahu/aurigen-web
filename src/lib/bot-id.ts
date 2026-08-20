/**
 * BOT ID helpers. Format: BOT-001, BOT-014, BOT-901, ...
 * Mentors assign IDs during check-in. Registration (GAS) does not create a BOT ID.
 */

export const BOT_ID_PATTERN = /^BOT-\d{3,}$/i;
export const BOT_ID_EXAMPLE = "BOT-014";

/** Reserved high range for layout samples. Real teams start at BOT-001. */
export const SAMPLE_BOT_ID_MIN = 900;

export function normalizeBotId(raw: string): string {
  return raw.trim().toUpperCase();
}

export function isValidBotId(raw: string): boolean {
  return BOT_ID_PATTERN.test(raw.trim());
}

export function parseBotNumber(raw: string): number | null {
  const id = normalizeBotId(raw);
  const match = /^BOT-(\d+)$/.exec(id);
  if (!match) return null;
  return Number.parseInt(match[1], 10);
}

export function isReservedSampleBotId(raw: string): boolean {
  const n = parseBotNumber(raw);
  return n !== null && n >= SAMPLE_BOT_ID_MIN;
}

export const BOT_ID_ASSIGNMENT_NOTE =
  "Mentors assign a unique BOT ID (BOT-001, BOT-002, ...) to each team of 1-5 during workshop check-in. The registration form does not issue a BOT ID.";

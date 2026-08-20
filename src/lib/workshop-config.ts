/**
 * ESP32 Walking Robot workshop public config.
 * Static export: NEXT_PUBLIC_* values are inlined at build time.
 */

export const WORKSHOP_SLUG = "esp32-walking-robot";
export const WORKSHOP_ID = "esp32-walking-robot";
export const WORKSHOP_PATH = `/workshops/${WORKSHOP_SLUG}/`;
export const LAB_PATH = `/labs/${WORKSHOP_SLUG}/`;
export const BUILDERS_PATH = "/builders/";
export const VLOG_PATH = `${WORKSHOP_PATH}vlog/`;
export const CHALLENGE_PATH = `${WORKSHOP_PATH}7-day-challenge/`;
export const SOCIAL_PATH = `${WORKSHOP_PATH}social-kit/`;

export const MEDIA_BASE = `/workshops/${WORKSHOP_SLUG}`;

/** Optional GAS endpoint for vlog submissions. Empty = localStorage only. */
export function getVlogGasUrl(): string {
  return process.env.NEXT_PUBLIC_VLOG_GAS_URL?.trim() || "";
}

export function getChallengeGasUrl(): string {
  return process.env.NEXT_PUBLIC_CHALLENGE_GAS_URL?.trim() || "";
}

/** True when the static client has no remote workshop endpoints configured. */
export function isLocalDemoMode(): boolean {
  return !getVlogGasUrl() && !getChallengeGasUrl();
}

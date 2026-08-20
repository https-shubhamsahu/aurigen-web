/**
 * ESP32 Walking Robot workshop public config.
 * Static export: NEXT_PUBLIC_* values are inlined at build time.
 */

import { getWorkshopRuntimeGasUrl } from "@/lib/workshop-runtime";

export const WORKSHOP_SLUG = "esp32-walking-robot";
export const WORKSHOP_ID = "esp32-walking-robot";
export const WORKSHOP_PATH = `/workshops/${WORKSHOP_SLUG}/`;
export const LAB_PATH = `/labs/${WORKSHOP_SLUG}/`;
export const BUILDERS_PATH = "/builders/";
export const VLOG_PATH = `${WORKSHOP_PATH}vlog/`;
export const CHALLENGE_PATH = `${WORKSHOP_PATH}7-day-challenge/`;
export const SOCIAL_PATH = `${WORKSHOP_PATH}social-kit/`;

export const MEDIA_BASE = `/workshops/${WORKSHOP_SLUG}`;

/** Shared workshop Sheet Web App. Falls back to WORKSHOP_RUNTIME_GAS_URL_DEFAULT. */
export function getVlogGasUrl(): string {
  return getWorkshopRuntimeGasUrl();
}

export function getChallengeGasUrl(): string {
  return process.env.NEXT_PUBLIC_CHALLENGE_GAS_URL?.trim() || "";
}

/** True when the shared Sheet URL is not inlined at build time. */
export function isLocalDemoMode(): boolean {
  return !getWorkshopRuntimeGasUrl();
}

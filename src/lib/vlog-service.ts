/**
 * Vlog submit + public gallery.
 * Product database = Google Apps Script + Sheets (workshop-runtime).
 * localStorage is only a labeled offline retry cache, never the live gallery.
 */

import { seedApprovedVlogs } from "@/content/workshops/esp32-walking-robot/vlog";
import {
  fetchPublicVlogs,
  getWorkshopRuntimeDescription,
  getWorkshopRuntimeLabel,
  isWorkshopRuntimeConfigured,
  submitWorkshopVlog,
  type VlogSubmitInput,
  type WorkshopRuntimeResult,
} from "@/lib/workshop-runtime";
import { isPublicVlogStatus } from "@/lib/public-data";
import type { VlogSubmission } from "@/types/workshop-ecosystem";

export function getVlogServiceLabel(): string {
  return getWorkshopRuntimeLabel();
}

export function getVlogServiceDescription(): string {
  return getWorkshopRuntimeDescription();
}

export async function listPublicVlogs(): Promise<VlogSubmission[]> {
  const seeded = seedApprovedVlogs.filter(
    (v) => isPublicVlogStatus(v.status) && v.consent,
  );

  if (!isWorkshopRuntimeConfigured()) {
    return seeded;
  }

  const remote = await fetchPublicVlogs();
  const seen = new Set(seeded.map((v) => keyOf(v)));
  const merged = [...seeded];
  for (const row of remote) {
    const key = keyOf(row);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(row);
  }
  return merged;
}

export async function submitVlog(
  input: VlogSubmitInput,
): Promise<WorkshopRuntimeResult> {
  return submitWorkshopVlog(input);
}

function keyOf(v: VlogSubmission): string {
  return `${v.botId}|${v.videoUrl.trim().toLowerCase().replace(/\/+$/, "")}`;
}

/**
 * VlogService: localStorage now, optional GAS fire-and-forget later.
 * Static Pages has no server DB. This is not a secure backend.
 */

import { seedApprovedVlogs } from "@/content/workshops/esp32-walking-robot/vlog";
import { getStorageProvider } from "@/lib/storage";
import { getVlogGasUrl } from "@/lib/workshop-config";
import { normalizeBotId } from "@/lib/bot-id";
import type { PublishStatus, VlogSubmission } from "@/types/workshop-ecosystem";

export type VlogServiceMode = "local" | "local+gas";

export function getVlogServiceMode(): VlogServiceMode {
  return getVlogGasUrl() ? "local+gas" : "local";
}

export function getVlogServiceLabel(): string {
  return getVlogServiceMode() === "local+gas"
    ? "Local save plus optional remote copy"
    : "Local demo mode";
}

export function getVlogServiceDescription(): string {
  if (getVlogServiceMode() === "local+gas") {
    return "This browser stores the submission, then also posts a copy to a configured Apps Script URL. The public gallery still only shows Approved, Featured, or Winner entries after a human promotes them into content.";
  }
  return "This browser stores pending submissions in localStorage. Clearing site data, using another device, or another browser loses them. Nothing is uploaded to a server until a remote endpoint is configured.";
}

function isPublicVlogStatus(status: PublishStatus): boolean {
  return status === "approved" || status === "featured" || status === "winner";
}

export async function listPublicVlogs(): Promise<VlogSubmission[]> {
  const stored = await getStorageProvider().listVlogs(true);
  const seeded: VlogSubmission[] = [...seedApprovedVlogs];
  const merged = [...seeded, ...stored];
  return merged.filter((v) => isPublicVlogStatus(v.status) && v.consent);
}

export async function submitVlog(
  input: Omit<VlogSubmission, "id" | "createdAt" | "status" | "botId"> & {
    botId: string;
  },
): Promise<{ submission: VlogSubmission; mode: VlogServiceMode }> {
  const submission: VlogSubmission = {
    ...input,
    id: `vlog_${Date.now()}`,
    botId: normalizeBotId(input.botId),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await getStorageProvider().saveVlog(submission);

  const gas = getVlogGasUrl();
  if (gas) {
    try {
      await fetch(gas, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(submission),
      });
    } catch {
      /* local save already succeeded */
    }
  }

  return { submission, mode: getVlogServiceMode() };
}

/**
 * Shared workshop store client (Google Apps Script + Google Sheets).
 *
 * Static GitHub Pages has no private admin and no server database.
 * Anyone can POST. Public GET must not leak PII or pending rows.
 *
 * NEXT_PUBLIC_* values are inlined at `next build` (required for static GitHub
 * Pages). The default keeps production working without CI secrets — the GAS
 * Web App URL is a client-facing endpoint by design.
 *
 * Prefer `.env.local` for local overrides; restart `npm run dev` after changes.
 */

import { normalizeBotId } from "@/lib/bot-id";
import { isPublicVlogStatus } from "@/lib/public-data";
import type { VlogSubmission } from "@/types/workshop-ecosystem";

/** Google Apps Script Web App (`…/exec`) for vlog GET/POST. */
export const WORKSHOP_RUNTIME_GAS_URL_DEFAULT =
  "https://script.google.com/macros/s/AKfycbyunktfSc6tCbbcS7HeC8ltwdcqFSPMIQ1cAonSRNmc-_sOS3deYjoVhggHpEA16hf5/exec";

const OFFLINE_VLOG_KEY = "aurigen:esp32-wr:vlog-offline-retry";

export type WorkshopRuntimeCode =
  | "not_configured"
  | "validation"
  | "duplicate"
  | "error";

export type WorkshopRuntimeResult = {
  ok: boolean;
  message: string;
  code?: WorkshopRuntimeCode;
  /** Labeled local retry copy only. Not the shared product database. */
  cachedLocally?: boolean;
};

export type VlogSubmitInput = {
  botId: string;
  teamName: string;
  videoUrl: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  description: string;
  githubUrl?: string;
  consent: boolean;
};

export function getWorkshopRuntimeGasUrl(): string {
  return (
    process.env.NEXT_PUBLIC_WORKSHOP_RUNTIME_GAS_URL?.trim() ||
    process.env.NEXT_PUBLIC_VLOG_GAS_URL?.trim() ||
    WORKSHOP_RUNTIME_GAS_URL_DEFAULT
  );
}

export function isWorkshopRuntimeConfigured(): boolean {
  return Boolean(getWorkshopRuntimeGasUrl());
}

export function getWorkshopRuntimeLabel(): string {
  return isWorkshopRuntimeConfigured()
    ? "Shared Google Sheet"
    : "Shared sheet not configured";
}

export function getWorkshopRuntimeDescription(): string {
  if (isWorkshopRuntimeConfigured()) {
    return "Submissions go to the shared Google Sheet that mentors moderate. The public gallery only shows rows with Status approved, featured, or winner. Pending stays in the Sheet, not on this site.";
  }
  return "Shared sheet not configured. Set NEXT_PUBLIC_WORKSHOP_RUNTIME_GAS_URL and rebuild. This site will not silently use localStorage as the product database.";
}

type GasEnvelope = {
  ok?: boolean;
  message?: string;
  code?: WorkshopRuntimeCode;
  vlogs?: Partial<VlogSubmission>[];
};

export async function fetchPublicVlogs(): Promise<VlogSubmission[]> {
  const url = getWorkshopRuntimeGasUrl();
  if (!url) return [];

  const endpoint = withQuery(url, { type: "vlog" });
  const res = await fetch(endpoint, {
    method: "GET",
    redirect: "follow",
    cache: "no-store",
  });
  const text = await res.text();
  const data = parseJson(text);
  if (!data || data.ok === false || !Array.isArray(data.vlogs)) {
    throw new Error(data?.message || "Could not load the public vlog list.");
  }

  return data.vlogs
    .map(normalizePublicVlog)
    .filter((v): v is VlogSubmission => v !== null);
}

export async function submitWorkshopVlog(
  input: VlogSubmitInput,
): Promise<WorkshopRuntimeResult> {
  const payload = {
    type: "vlog",
    botId: normalizeBotId(input.botId),
    teamName: input.teamName.trim(),
    videoUrl: input.videoUrl.trim(),
    instagram: input.instagramUrl?.trim() || "",
    youtube: input.youtubeUrl?.trim() || "",
    description: input.description.trim(),
    github: input.githubUrl?.trim() || "",
    consent: input.consent === true,
  };

  const url = getWorkshopRuntimeGasUrl();
  if (!url) {
    writeOfflineRetry(payload);
    return {
      ok: false,
      code: "not_configured",
      cachedLocally: true,
      message:
        "Shared sheet not configured. A labeled copy is stored on this device for retry after the Sheet URL is set. Mentors cannot see it yet.",
    };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    const text = await res.text();
    const data = parseJson(text);

    if (data && typeof data.ok === "boolean") {
      if (data.ok) clearMatchingOfflineRetry(payload.botId, payload.videoUrl);
      return {
        ok: data.ok,
        code: data.ok ? undefined : data.code || "error",
        message:
          data.message ||
          (data.ok
            ? "Saved to shared sheet."
            : "Could not save to the shared sheet."),
      };
    }

    if (!res.ok) {
      writeOfflineRetry(payload);
      return {
        ok: false,
        code: "error",
        cachedLocally: true,
        message:
          "Could not save to the shared sheet. A labeled copy is stored on this device for retry.",
      };
    }

    clearMatchingOfflineRetry(payload.botId, payload.videoUrl);
    return { ok: true, message: "Saved to shared sheet." };
  } catch {
    writeOfflineRetry(payload);
    return {
      ok: false,
      code: "error",
      cachedLocally: true,
      message:
        "Could not reach the shared sheet. A labeled copy is stored on this device for retry.",
    };
  }
}

function normalizePublicVlog(raw: Partial<VlogSubmission>): VlogSubmission | null {
  const botId = normalizeBotId(String(raw.botId || ""));
  const videoUrl = String(raw.videoUrl || "").trim();
  const status = raw.status;
  if (!botId || !videoUrl) return null;
  if (!status || !isPublicVlogStatus(status)) return null;
  if (raw.consent === false) return null;

  return {
    id: String(raw.id || `vlog_${botId}_${videoUrl}`),
    botId,
    teamName: String(raw.teamName || "").trim() || botId,
    videoUrl,
    instagramUrl: raw.instagramUrl || undefined,
    youtubeUrl: raw.youtubeUrl || undefined,
    description: String(raw.description || "").trim(),
    githubUrl: raw.githubUrl || undefined,
    consent: true,
    status,
    createdAt: String(raw.createdAt || ""),
  };
}

function withQuery(base: string, params: Record<string, string>): string {
  try {
    const url = new URL(base);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return url.toString();
  } catch {
    const join = base.includes("?") ? "&" : "?";
    return `${base}${join}type=${encodeURIComponent(params.type)}`;
  }
}

function parseJson(text: string): GasEnvelope | null {
  try {
    return JSON.parse(text) as GasEnvelope;
  } catch {
    return null;
  }
}

type OfflinePayload = {
  type: string;
  botId: string;
  videoUrl: string;
  [key: string]: unknown;
};

function readOfflineQueue(): OfflinePayload[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(OFFLINE_VLOG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as OfflinePayload[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeOfflineRetry(payload: OfflinePayload): void {
  if (typeof window === "undefined") return;
  try {
    const next = [
      payload,
      ...readOfflineQueue().filter(
        (row) =>
          !(
            row.botId === payload.botId &&
            normalizeUrl(row.videoUrl) === normalizeUrl(payload.videoUrl)
          ),
      ),
    ];
    window.localStorage.setItem(OFFLINE_VLOG_KEY, JSON.stringify(next));
  } catch {
    /* quota / private mode */
  }
}

function clearMatchingOfflineRetry(botId: string, videoUrl: string): void {
  if (typeof window === "undefined") return;
  try {
    const next = readOfflineQueue().filter(
      (row) =>
        !(row.botId === botId && normalizeUrl(row.videoUrl) === normalizeUrl(videoUrl)),
    );
    window.localStorage.setItem(OFFLINE_VLOG_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

function normalizeUrl(value: string): string {
  return value.trim().toLowerCase().replace(/\/+$/, "");
}

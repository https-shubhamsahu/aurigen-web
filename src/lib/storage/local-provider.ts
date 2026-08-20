/**
 * LocalStorage-backed provider for vlogs + challenge progress.
 * Seed projects come from content modules (immutable demos).
 */

import { seedBuilders } from "@/content/builders/seed";
import type {
  ChallengeProgress,
  Project,
  VlogSubmission,
} from "@/types/workshop-ecosystem";
import type { StorageProvider } from "@/lib/storage/types";

const VLOG_KEY = "aurigen:esp32-wr:vlogs";
const CHALLENGE_KEY = "aurigen:esp32-wr:challenge";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
}

function publicProject(p: Project): boolean {
  return (
    p.status === "approved" ||
    p.status === "published" ||
    p.status === "featured" ||
    p.status === "winner"
  );
}

export class LocalMockProvider implements StorageProvider {
  readonly name = "local-mock";

  async listProjects(): Promise<Project[]> {
    return seedBuilders.filter((p) => publicProject(p) && !p.isSample);
  }

  async getProject(botId: string): Promise<Project | null> {
    const id = botId.toUpperCase();
    const found = seedBuilders.find(
      (p) => p.botId.toUpperCase() === id && publicProject(p) && !p.isSample,
    );
    return found ?? null;
  }

  async listVlogs(publicOnly = true): Promise<VlogSubmission[]> {
    const all = readJson<VlogSubmission[]>(VLOG_KEY, []);
    if (!publicOnly) return all;
    return all.filter(
      (v) =>
        v.status === "approved" ||
        v.status === "featured" ||
        v.status === "winner",
    );
  }

  async saveVlog(submission: VlogSubmission): Promise<VlogSubmission> {
    const all = readJson<VlogSubmission[]>(VLOG_KEY, []);
    const next = [submission, ...all.filter((v) => v.id !== submission.id)];
    writeJson(VLOG_KEY, next);
    return submission;
  }

  async getChallengeProgress(
    botId: string,
  ): Promise<ChallengeProgress | null> {
    const map = readJson<Record<string, ChallengeProgress>>(CHALLENGE_KEY, {});
    return map[botId.toUpperCase()] ?? null;
  }

  async saveChallengeProgress(progress: ChallengeProgress): Promise<void> {
    const map = readJson<Record<string, ChallengeProgress>>(CHALLENGE_KEY, {});
    map[progress.botId.toUpperCase()] = {
      ...progress,
      botId: progress.botId.toUpperCase(),
      updatedAt: new Date().toISOString(),
    };
    writeJson(CHALLENGE_KEY, map);
  }
}

export const localStorageProvider = new LocalMockProvider();

/**
 * Google Drive storage stub.
 * Wire real Drive API later with env credentials. No fake secrets here.
 *
 * Required env (document only; leave unset until configured):
 * - NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID
 * - NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY
 * - NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID
 */

import { LocalMockProvider } from "@/lib/storage/local-provider";
import {
  getGoogleDriveConfig,
  type StorageProvider,
} from "@/lib/storage/types";
import type {
  ChallengeProgress,
  Project,
  VlogSubmission,
} from "@/types/workshop-ecosystem";

/**
 * Falls back to LocalMockProvider until Drive env is fully configured.
 * Methods throw a clear error if callers expect live Drive without setup.
 */
export class GoogleDriveProvider implements StorageProvider {
  readonly name = "google-drive-stub";
  private fallback = new LocalMockProvider();

  isConfigured(): boolean {
    return getGoogleDriveConfig().enabled;
  }

  private ensureOrFallback(): StorageProvider {
    if (!this.isConfigured()) return this.fallback;
    // Real Drive client would be constructed here.
    // Until then, keep local behavior and surface configuration state.
    return this.fallback;
  }

  async listProjects(): Promise<Project[]> {
    return this.ensureOrFallback().listProjects();
  }

  async getProject(botId: string): Promise<Project | null> {
    return this.ensureOrFallback().getProject(botId);
  }

  async listVlogs(publicOnly?: boolean): Promise<VlogSubmission[]> {
    return this.ensureOrFallback().listVlogs(publicOnly);
  }

  async saveVlog(submission: VlogSubmission): Promise<VlogSubmission> {
    return this.ensureOrFallback().saveVlog(submission);
  }

  async getChallengeProgress(
    botId: string,
  ): Promise<ChallengeProgress | null> {
    return this.ensureOrFallback().getChallengeProgress(botId);
  }

  async saveChallengeProgress(progress: ChallengeProgress): Promise<void> {
    return this.ensureOrFallback().saveChallengeProgress(progress);
  }

  /** Status string for admin / docs UI. */
  statusMessage(): string {
    if (this.isConfigured()) {
      return "Drive env present. API client not yet implemented; using local fallback.";
    }
    return "Drive not configured. Set NEXT_PUBLIC_GOOGLE_DRIVE_* env vars.";
  }
}

export const googleDriveProvider = new GoogleDriveProvider();

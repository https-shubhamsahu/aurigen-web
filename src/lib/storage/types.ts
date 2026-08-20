/**
 * StorageProvider abstraction for workshop participant/project data.
 * Static export has no server DB. LocalMockProvider powers client flows.
 * GoogleDriveProvider is a stub with env placeholders only.
 */

import type {
  ChallengeProgress,
  Project,
  VlogSubmission,
} from "@/types/workshop-ecosystem";

export type StorageProvider = {
  readonly name: string;
  listProjects(): Promise<Project[]>;
  getProject(botId: string): Promise<Project | null>;
  listVlogs(publicOnly?: boolean): Promise<VlogSubmission[]>;
  saveVlog(submission: VlogSubmission): Promise<VlogSubmission>;
  getChallengeProgress(botId: string): Promise<ChallengeProgress | null>;
  saveChallengeProgress(progress: ChallengeProgress): Promise<void>;
};

export type GoogleDriveConfig = {
  clientId?: string;
  apiKey?: string;
  folderId?: string;
  enabled: boolean;
};

/** Read Drive-related env placeholders. Never invent credentials. */
export function getGoogleDriveConfig(): GoogleDriveConfig {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID?.trim();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY?.trim();
  const folderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID?.trim();
  return {
    clientId: clientId || undefined,
    apiKey: apiKey || undefined,
    folderId: folderId || undefined,
    enabled: Boolean(clientId && apiKey && folderId),
  };
}

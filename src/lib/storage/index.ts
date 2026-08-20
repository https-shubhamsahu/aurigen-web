import { localStorageProvider } from "@/lib/storage/local-provider";
import { googleDriveProvider } from "@/lib/storage/google-drive-provider";
import type { StorageProvider } from "@/lib/storage/types";

export type { StorageProvider } from "@/lib/storage/types";
export { getGoogleDriveConfig } from "@/lib/storage/types";
export { LocalMockProvider, localStorageProvider } from "@/lib/storage/local-provider";
export {
  GoogleDriveProvider,
  googleDriveProvider,
} from "@/lib/storage/google-drive-provider";

/**
 * Default public client storage.
 * Prefers Drive stub when env is set (still local-backed until API lands).
 */
export function getStorageProvider(): StorageProvider {
  if (googleDriveProvider.isConfigured()) return googleDriveProvider;
  return localStorageProvider;
}

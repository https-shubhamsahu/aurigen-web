/**
 * Public vs private data rules for workshop surfaces.
 * Registration contact fields must never appear on public pages.
 */

import type { PublishStatus } from "@/types/workshop-ecosystem";

export const PUBLIC_PROJECT_STATUSES: PublishStatus[] = [
  "approved",
  "published",
  "featured",
  "winner",
];

export const PUBLIC_VLOG_STATUSES: PublishStatus[] = [
  "approved",
  "featured",
  "winner",
];

export function isPublicProjectStatus(status: PublishStatus): boolean {
  return PUBLIC_PROJECT_STATUSES.includes(status);
}

export function isPublicVlogStatus(status: PublishStatus): boolean {
  return PUBLIC_VLOG_STATUSES.includes(status);
}

/** Field names that must never render on public workshop pages. */
export const PRIVATE_FIELD_NAMES = [
  "email",
  "phone",
  "whatsapp",
  "driveUrl",
  "privateDriveId",
  "registrationId",
] as const;

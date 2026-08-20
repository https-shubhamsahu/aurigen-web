/**
 * Public builder seed data.
 * Samples use BOT-901+ so they never collide with real BOT-001 assignment.
 * Samples are layout fixtures only. Do not treat them as workshop teams.
 * No phones, emails, or private Drive URLs.
 */

import { MEDIA_BASE } from "@/lib/workshop-config";
import { isPublicProjectStatus } from "@/lib/public-data";
import type { Project } from "@/types/workshop-ecosystem";

export const seedBuilders: Project[] = [
  {
    botId: "BOT-901",
    robotName: "Stride",
    teamName: "Sample Team Alpha",
    members: ["Aarav", "Diya"],
    college: "TSEC",
    workshopName: "ESP32 Walking Robot Workshop",
    workshopId: "esp32-walking-robot",
    date: "2026-08-21",
    description:
      "Layout sample only. Not a real workshop team. Replace this file with consented profiles after the event.",
    features: ["Basic walk", "OLED smile", "BLE forward"],
    tech: ["ESP32-C3", "Arduino", "Servo", "OLED", "BLE"],
    images: [
      {
        id: "bot901-1",
        kind: "image",
        src: `${MEDIA_BASE}/robot-1.webp`,
        alt: "Sample walking robot build",
      },
    ],
    githubUrl: undefined,
    demoUrl: undefined,
    awards: [
      {
        id: "a1",
        category: "fast-learner",
        label: "Fast Learner",
      },
    ],
    score: 72,
    featured: true,
    status: "featured",
    isSample: true,
  },
  {
    botId: "BOT-902",
    robotName: "Pulse",
    teamName: "Sample Team Beta",
    members: ["Kabir", "Meera", "Rohan"],
    college: "TSEC",
    workshopName: "ESP32 Walking Robot Workshop",
    workshopId: "esp32-walking-robot",
    date: "2026-08-21",
    description:
      "Layout sample only. Not a real workshop team. Focus on dance mode and OLED frames.",
    features: ["Dance mode", "OLED blink", "Turn left/right"],
    tech: ["ESP32-C3", "Arduino", "Servo", "OLED"],
    images: [
      {
        id: "bot902-1",
        kind: "image",
        src: `${MEDIA_BASE}/robot-2.webp`,
        alt: "Sample robot with OLED face",
      },
    ],
    awards: [
      {
        id: "a2",
        category: "best-hack",
        label: "Best Hack",
      },
    ],
    score: 84,
    featured: true,
    status: "featured",
    isSample: true,
  },
  {
    botId: "BOT-903",
    robotName: "Nexus",
    teamName: "Sample Team Gamma",
    members: ["Isha"],
    college: "TSEC",
    workshopName: "ESP32 Walking Robot Workshop",
    workshopId: "esp32-walking-robot",
    date: "2026-08-22",
    description:
      "Layout sample only. Not a real workshop team. Clean wiring example.",
    features: ["Documented gait", "Battery monitor on OLED"],
    tech: ["ESP32-C3", "Arduino", "OLED"],
    images: [
      {
        id: "bot903-1",
        kind: "image",
        src: `${MEDIA_BASE}/showcase-1.webp`,
        alt: "Sample workshop build showcase",
      },
    ],
    awards: [
      {
        id: "a3",
        category: "innovation",
        label: "Innovation",
      },
    ],
    score: 78,
    featured: false,
    status: "published",
    isSample: true,
  },
];

export function getBuilderByBotId(botId: string): Project | undefined {
  return seedBuilders.find(
    (p) => p.botId.toUpperCase() === botId.toUpperCase(),
  );
}

/** Real consented public profiles. Samples are excluded. */
export function listPublicBuilders(): Project[] {
  return seedBuilders.filter(
    (p) => isPublicProjectStatus(p.status) && !p.isSample,
  );
}

/** Layout fixtures only. Never present these as workshop results. */
export function listLayoutSampleBuilders(): Project[] {
  return seedBuilders.filter(
    (p) => isPublicProjectStatus(p.status) && p.isSample,
  );
}

export const builderFilters = [
  { id: "all", label: "All" },
  { id: "featured", label: "Featured" },
  { id: "winners", label: "Winners" },
  { id: "best-vlog", label: "Best Vlog" },
  { id: "best-hack", label: "Best Hack" },
  { id: "fast-learner", label: "Fast Learner" },
  { id: "innovation", label: "Innovation" },
  { id: "samples", label: "Layout samples" },
] as const;

export type BuilderFilterId = (typeof builderFilters)[number]["id"];

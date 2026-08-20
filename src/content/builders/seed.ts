/**
 * Public builder seed data.
 * Samples use BOT-901+ so they never collide with real BOT-001 assignment.
 * Samples are layout fixtures only. Do not treat them as workshop teams.
 * Real BOT-001 to BOT-014 rows are workshop teams from the college Google Form.
 * First names only. No phones, emails, WhatsApp, or private Drive URLs.
 */

import { MEDIA_BASE } from "@/lib/workshop-config";
import { isPublicProjectStatus } from "@/lib/public-data";
import type { Project } from "@/types/workshop-ecosystem";

const REGISTERED_WORKSHOP_NAME = "ESP32 Walking Robot Workshop";
const REGISTERED_WORKSHOP_ID = "esp32-walking-robot";
const REGISTERED_DATE = "2026-08-21";

function registeredTeam(input: {
  botId: string;
  teamName: string;
  members: string[];
  yearBranch: string;
}): Project {
  const count = input.members.length;
  return {
    botId: input.botId,
    teamName: input.teamName,
    members: input.members,
    college: "TSEC",
    workshopName: REGISTERED_WORKSHOP_NAME,
    workshopId: REGISTERED_WORKSHOP_ID,
    date: REGISTERED_DATE,
    description: `Registered team of ${count} (${input.yearBranch}) building at the ESP32 Walking Robot workshop organized by Robotics & Automation Club, TSEC. Robot photos and build notes are not published yet.`,
    features: [],
    tech: [],
    images: [],
    awards: [],
    score: 0,
    featured: false,
    status: "published",
    isSample: false,
  };
}

const registeredWorkshopTeams: Project[] = [
  registeredTeam({
    botId: "BOT-001",
    teamName: "FC ESP 32",
    members: ["Divyanshu", "Ayush", "Yash", "Rahul", "Nitesh"],
    yearBranch: "Ece/SY",
  }),
  registeredTeam({
    botId: "BOT-002",
    teamName: "Pentabotics",
    members: ["Shree", "Bhumika", "Pratik", "Girishma", "Tanish"],
    yearBranch: "SYCO-A",
  }),
  registeredTeam({
    botId: "BOT-003",
    teamName: "Roborush",
    members: ["Anuj", "Vivek", "Atharva", "Krishna", "Ritvik"],
    yearBranch: "SYECE",
  }),
  registeredTeam({
    botId: "BOT-004",
    teamName: "FiveBots",
    members: ["Anuj", "Divya", "Nidhi", "Dhruv", "Chandan"],
    yearBranch: "SE-ECE",
  }),
  registeredTeam({
    botId: "BOT-005",
    teamName: "RoboVortex",
    members: ["Ruhi", "Yashvi", "Rushabh", "Snehil", "Rishabh"],
    yearBranch: "CO",
  }),
  registeredTeam({
    botId: "BOT-006",
    teamName: "varonix",
    members: ["Yash", "Harsh", "Priyansh"],
    yearBranch: "SEME",
  }),
  registeredTeam({
    botId: "BOT-007",
    teamName: "AASRG",
    members: ["Aryan", "Sachin", "Ganesh", "Rajat", "Aadi"],
    yearBranch: "SYCO",
  }),
  registeredTeam({
    botId: "BOT-008",
    teamName: "MechNova",
    members: ["Diksha", "Kranti", "Rohan", "Nandini", "Ragini"],
    yearBranch: "SEME",
  }),
  registeredTeam({
    botId: "BOT-009",
    teamName: "Ctrl + Alt + Defeat",
    members: ["Yash", "Ritvik", "Shivam", "Harsh", "Akshay"],
    yearBranch: "SYECE",
  }),
  registeredTeam({
    botId: "BOT-010",
    teamName: "Titan Tech",
    members: ["Jasmin", "Asmita"],
    yearBranch: "2nd/SY-IT",
  }),
  registeredTeam({
    botId: "BOT-011",
    teamName: "The Thunderbolts",
    members: ["Akshat", "Yug", "Binay", "Ankit", "Jay"],
    yearBranch: "SECO-A",
  }),
  registeredTeam({
    botId: "BOT-012",
    teamName: "The Sixth Sense",
    members: ["Amilita", "Asavari", "Soham", "Atul", "Panshul"],
    yearBranch: "SYECE",
  }),
  registeredTeam({
    botId: "BOT-013",
    teamName: "ROBONEX",
    // Two members share the first name Anjali in the roster. Last names stay private.
    members: ["Aditi", "Priyanka", "Anjali", "Shramika", "Anjali"],
    yearBranch: "TYECE",
  }),
  registeredTeam({
    botId: "BOT-014",
    teamName: "E-NNOVATORS",
    members: ["Sai", "Shravani", "Pavni", "Yash", "Kashish"],
    yearBranch: "TYECE",
  }),
];

const layoutSamples: Project[] = [
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

export const seedBuilders: Project[] = [
  ...registeredWorkshopTeams,
  ...layoutSamples,
];

export function builderHeadline(project: Project): string {
  const robot = project.robotName?.trim();
  return robot || project.teamName;
}

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

/** Layout fixtures only. Kept for internal preview. Not shown on the public gallery. */
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
] as const;

export type BuilderFilterId = (typeof builderFilters)[number]["id"];

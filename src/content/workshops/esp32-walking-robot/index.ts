/**
 * ESP32 Walking Robot Workshop hub content.
 * Official organizer: Robotics & Automation Club, TSEC.
 * Aurigen provides resources and continuation only.
 */

import {
  CHALLENGE_PATH,
  LAB_PATH,
  MEDIA_BASE,
  SOCIAL_PATH,
  VLOG_PATH,
  WORKSHOP_ID,
  WORKSHOP_PATH,
  BUILDERS_PATH,
} from "@/lib/workshop-config";
import type { Workshop } from "@/types/workshop-ecosystem";

export const workshop: Workshop = {
  id: WORKSHOP_ID,
  slug: "esp32-walking-robot",
  name: "ESP32 Walking Robot Workshop",
  shortName: "ESP32 Walking Robot",
  organizer: "Robotics & Automation Club, Thakur Shyamnarayan Engineering College",
  organizerShort: "Robotics & Automation Club, TSEC",
  college: "Thakur Shyamnarayan Engineering College",
  dates: {
    day1: {
      label: "21 August 2026",
      start: "1:00 PM",
      end: "5:30 PM",
    },
    day2: {
      label: "22 August 2026",
      start: "9:30 AM",
      end: "4:30 PM",
    },
  },
  teamSize: { min: 1, max: 5 },
  philosophy: ["Build", "Program", "Debug", "Customize", "Compete"],
  hardware: [
    "ESP32-C3 expansion board",
    "4 servos (driven directly by ESP32-C3)",
    "0.96\" OLED display",
    "1× 3.7V Li-ion cell + holder",
    "Slide switch",
    "Optional 470µF capacitor",
  ],
  path: WORKSHOP_PATH,
};

export const workshopMedia = {
  hero: `${MEDIA_BASE}/hero.jpg`,
  poster: `${MEDIA_BASE}/poster.png`,
  racLogo: `${MEDIA_BASE}/rac-logo.webp`,
  robot1: `${MEDIA_BASE}/robot-1.jpg`,
  robot2: `${MEDIA_BASE}/robot-2.jpg`,
  showcase1: `${MEDIA_BASE}/showcase-1.webp`,
  showcase2: `${MEDIA_BASE}/showcase-2.webp`,
  winner: `${MEDIA_BASE}/winner.webp`,
} as const;

export const workshopMeta = {
  title: "ESP32 Walking Robot | Hands-On Robotics Project",
  description:
    "Two-day ESP32-C3 walking robot workshop by the Robotics & Automation Club, TSEC. Assemble, program, debug, customize, and compete with your own robot.",
  ogDescription:
    "Hands-on ESP32 walking robot project. 21-22 August 2026. Organized by Robotics & Automation Club, TSEC.",
};

export const workshopHero = {
  brand: "ESP32 Walking Robot",
  support:
    "Field guide for the two-day ESP32-C3 walking robot workshop. Teams already signed up through the college Google Form. Open this on your phone for schedule, BOT IDs, code, vlog submit, and social kit.",
  organizerLine: workshop.organizerShort,
  datesLine: "21-22 August 2026",
  teamLine: `Teams of ${workshop.teamSize.min}-${workshop.teamSize.max}`,
  primaryCta: { label: "Find your team", href: BUILDERS_PATH },
  secondaryCta: { label: "Open Code Library", href: LAB_PATH },
};

export const fieldGuideLinks = [
  {
    title: "Find your team",
    detail: "Search by team name. BOT-001 through BOT-014 are on the roster.",
    href: BUILDERS_PATH,
  },
  {
    title: "Code library",
    detail: "ESP32-C3 modules from first boot to gait. No PCA9685.",
    href: LAB_PATH,
  },
  {
    title: "Vlog challenge",
    detail: "Submit BUILD. FAIL. DEBUG. WALK. to the shared sheet.",
    href: VLOG_PATH,
  },
  {
    title: "Social kit",
    detail: "Story PNG and captions. Credit RAC TSEC.",
    href: SOCIAL_PATH,
  },
] as const;

export const workshopOverview = {
  headline: "Workshop Overview",
  body: [
    "Organized by the Robotics & Automation Club, TSEC. Aurigen hosts this site. Aurigen is not the organizer.",
    "Over two days you build a walking robot from parts to first steps.",
    "You wire the ESP32-C3, drive four servos directly (no PCA9685), light up the OLED, and ship working firmware.",
    "This site does not take registrations. Find your team on the Builders page.",
  ],
};

export const robotSpecs = [
  {
    title: "ESP32-C3",
    detail: "Controller and BLE brain. Servos attach to GPIO pins directly.",
  },
  {
    title: "4 Servos",
    detail: "One per leg joint set. Timed PWM from the ESP32-C3. No external servo driver board.",
  },
  {
    title: "0.96\" OLED",
    detail: "Status, faces, and personality for your robot.",
  },
  {
    title: "Power",
    detail: "3.7V Li-ion with holder and slide switch. Optional bulk capacitor for servo spikes.",
  },
  {
    title: "Mechanics",
    detail: "Lightweight frame. Balance, stance, and gait come from your code.",
  },
  {
    title: "BLE",
    detail: "Wireless commands once the walk firmware is stable.",
  },
] as const;

export const journeyDay1 = [
  { time: "1:00 PM", title: "Discover" },
  { time: "1:45 PM", title: "Assemble" },
  { time: "2:30 PM", title: "Wire" },
  { time: "3:15 PM", title: "First Boot" },
  { time: "4:00 PM", title: "Servo Test" },
  { time: "4:45 PM", title: "OLED" },
] as const;

export const journeyDay2 = [
  { time: "9:30 AM", title: "Program" },
  { time: "10:45 AM", title: "BLE" },
  { time: "12:00 PM", title: "Debug" },
  { time: "1:15 PM", title: "Customize" },
  { time: "2:30 PM", title: "Today's missions" },
  { time: "3:30 PM", title: "Robot Arena" },
] as const;

export const challengesPreview = [
  { title: "Servo Challenge", detail: "Clean motion without jitter." },
  { title: "OLED Challenge", detail: "Give the robot a face and status UI." },
  { title: "BLE Challenge", detail: "Drive the robot from a phone." },
  { title: "Robot Personality", detail: "Make it feel alive." },
  { title: "Hack the Robot", detail: "Ship one bold custom feature." },
  { title: "Robot Arena", detail: "Compete with what you built." },
] as const;

export const postWorkshopNote = {
  title: "7-Day Challenge",
  detail: "Starts after the workshop. Personal tracker on your phone, not a global leaderboard.",
  href: CHALLENGE_PATH,
};

export const ecosystemLinks = [
  {
    title: "Code Library",
    detail: "Progressive ESP32-C3 modules from setup to gait.",
    href: LAB_PATH,
  },
  {
    title: "Builders",
    detail: "Team robots, features, and awards.",
    href: BUILDERS_PATH,
  },
  {
    title: "Vlog Challenge",
    detail: "BUILD. FAIL. DEBUG. WALK.",
    href: VLOG_PATH,
  },
  {
    title: "7-Day Challenge",
    detail: "Post-workshop. Personal tracker on this device, not a global leaderboard.",
    href: CHALLENGE_PATH,
  },
  {
    title: "Social Kit",
    detail: "Story templates and LinkedIn captions.",
    href: SOCIAL_PATH,
  },
] as const;

export const continueBuilding = {
  headline: "Your first robot is only the beginning",
  support:
    "Keep going into AI, robotics, vision, embedded systems, and automation.",
  tracks: [
    "Autonomous robotics",
    "Computer vision",
    "AI-controlled robots",
    "Sensors",
    "Voice control",
    "IoT",
    "Advanced gait systems",
  ],
  cta: { label: "Keep Building with Aurigen", href: "/#programs" },
};

export const workshopFaq = [
  {
    question: "Who organizes this workshop?",
    answer:
      "The Robotics & Automation Club at Thakur Shyamnarayan Engineering College (TSEC). Aurigen hosts this site. Aurigen is not the organizer.",
  },
  {
    question: "How do I register on this website?",
    answer:
      "You do not. The college did not allow website registration. Teams already signed up through the Google Form. Find your team and BOT ID on the Builders page.",
  },
  {
    question: "What hardware do we use?",
    answer:
      "ESP32-C3 expansion board, four servos driven directly by the ESP32-C3 (no PCA9685), a 0.96-inch OLED, a 3.7V Li-ion cell with holder, a slide switch, and optionally a 470µF capacitor.",
  },
  {
    question: "What is the team size?",
    answer: "Minimum 1 member. Maximum 5 members per BOT ID.",
  },
  {
    question: "When is the workshop?",
    answer:
      "Day 1: 21 August 2026, 1:00 PM to 5:30 PM. Day 2: 22 August 2026, 9:30 AM to 4:30 PM.",
  },
  {
    question: "Where do we find code?",
    answer:
      "Use the Code Library at /labs/esp32-walking-robot/. Modules cover setup through challenges and troubleshooting.",
  },
] as const;

export { LAB_PATH, BUILDERS_PATH, VLOG_PATH, CHALLENGE_PATH, SOCIAL_PATH, WORKSHOP_PATH };

/**
 * Aurigen BuildLab #001 content module.
 * Live /workshops/buildlab-001/ redirects to the workshop hub.
 * Registration copy in this file is unused by the live site.
 *
 * Media lives under public/workshops/buildlab-001/.
 */

import { aboutFounders } from "@/content/about";

export const buildLabSlug = "buildlab-001";
export const buildLabPath = `/workshops/${buildLabSlug}/`;

/** Centralized media paths under public/workshops/buildlab-001/. */
export const buildLabMedia = {
  heroVideo: `/workshops/${buildLabSlug}/hero.mp4`,
  heroVideoWebm: `/workshops/${buildLabSlug}/hero.webm`,
  showcaseImage: `/workshops/${buildLabSlug}/showcase.jpg`,
  robotImage1: `/workshops/${buildLabSlug}/robot-1.jpg`,
  robotImage2: `/workshops/${buildLabSlug}/robot-2.jpg`,
  brochurePdf: `/workshops/${buildLabSlug}/brochure.pdf`,
} as const;

export const buildLabMeta = {
  name: "ESP32 Walking Robot Workshop",
  title: "Build Your Own ESP32 Walking Robot",
  subtitle:
    "Build, program, and take home your own walking robot while learning real robotics through hands-on engineering.",
  tagline: "Build. Program. Walk. Take It Home.",
  description:
    "Hands-on ESP32 walking robot workshop by the Robotics & Automation Club, TSEC. Assemble a quadruped, program it with Arduino IDE, calibrate it, and take home a working robot. Aurigen hosts project resources for teams who keep building.",
};

export const buildLabHero = {
  headline: "Build Your Own ESP32 Walking Robot",
  support:
    "A Robotics & Automation Club, TSEC workshop. Assemble a real quadruped robot, program it using Arduino IDE, calibrate it, and take home a fully functional robot built entirely by you. Project resources continue on Aurigen.",
  badges: [
    "21-22 August 2026",
    "Teams of 1-5",
    "Beginner Friendly",
    "Take Home Robot",
    "ESP32-C3",
  ] as const,
  floatingChips: [
    "ESP32 Powered",
    "Beginner Friendly",
    "Take Home Project",
    "Hands-on Workshop",
  ] as const,
  primaryCta: { label: "Register Now", href: "#register" },
  secondaryCta: { label: "Open Workshop Hub", href: "/workshops/esp32-walking-robot/" },
};

export const buildLabFeatures = [
  "ESP32-C3 Controller",
  "BLE Communication",
  "0.96\" SH1106 OLED",
  "4 Servos (GPIO 0, 1, 3, 10)",
  "Buzzer (GPIO 4)",
  "3.7V Li-ion + holder",
  "Slide switch",
  "Arduino Programmable",
  "Take-home Robot",
] as const;

export const buildLabTopics = [
  "ESP32 Programming",
  "Arduino IDE",
  "Embedded Systems",
  "Servo Motors",
  "OLED Displays",
  "Electronics Basics",
  "Robot Assembly",
  "BLE Communication",
  "Debugging",
  "Calibration",
  "Engineering Thinking",
  "Problem Solving",
] as const;

export const buildLabSteps = [
  "Registration",
  "Introduction",
  "Electronics Fundamentals",
  "Robot Assembly",
  "Programming",
  "Calibration",
  "Testing",
  "Take Your Robot Home",
] as const;

export const buildLabAudience = [
  "First Year Students",
  "Second Year Students",
  "Absolute Beginners",
  "Robotics Enthusiasts",
  "Electronics Students",
  "Future AI Engineers",
  "Makers",
  "Curious Builders",
] as const;

export const buildLabIncluded = [
  "Complete Robot Kit",
  "Hands-on Mentorship",
  "Workshop Resources",
  "Source Code",
  "Take-home Robot",
  "Access to Aurigen project resources",
] as const;

export type BuildLabMentor = {
  name: string;
  role: string;
  portrait: { src: string; alt: string; objectPosition?: string };
  links: {
    email?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
};

/** Workshop mentor cards. Roles are workshop-specific; contact URLs from about. */
export const buildLabMentors: BuildLabMentor[] = [
  {
    name: "Shubham Sahu",
    role: "AI Engineer",
    portrait: {
      src: aboutFounders[0].portrait.src,
      alt: aboutFounders[0].portrait.alt,
      objectPosition: aboutFounders[0].portrait.objectPosition,
    },
    links: {
      email: aboutFounders[0].links.email,
      github: aboutFounders[0].links.github,
      linkedin: aboutFounders[0].links.linkedin,
      instagram: aboutFounders[0].links.instagram,
    },
  },
  {
    name: "Neel Bhogle",
    role: "Robotics Engineer",
    portrait: {
      src: aboutFounders[1].portrait.src,
      alt: aboutFounders[1].portrait.alt,
      objectPosition: aboutFounders[1].portrait.objectPosition,
    },
    links: {
      email: aboutFounders[1].links.email,
      linkedin: aboutFounders[1].links.linkedin,
      instagram: aboutFounders[1].links.instagram,
    },
  },
];

export type BuildLabFaqItem = {
  question: string;
  answer: string;
};

export const buildLabFaq: BuildLabFaqItem[] = [
  {
    question: "Who organizes this workshop?",
    answer:
      "The Robotics & Automation Club at Thakur Shyamnarayan Engineering College (TSEC). Aurigen hosts the registration page and project resources. Aurigen is not the organizer.",
  },
  {
    question: "When is the workshop?",
    answer:
      "Day 1: 21 August 2026, 1:00 PM to 5:30 PM. Day 2: 22 August 2026, 9:30 AM to 4:30 PM.",
  },
  {
    question: "What is the team size?",
    answer:
      "Minimum 1 member. Maximum 5 members. Mentors assign one BOT ID (BOT-001, BOT-002, ...) per team at check-in. Registration does not create a BOT ID.",
  },
  {
    question: "What hardware do we use?",
    answer:
      "ESP32-C3 expansion board, four servos on GPIO 0, 1, 3, 10 (no PCA9685), SH1106 OLED on GPIO 8/9 at 0x3C, buzzer on GPIO 4, one 3.7V Li-ion cell with holder, a slide switch, and optionally a 470µF capacitor on the servo rail.",
  },
  {
    question: "Do I need prior robotics experience?",
    answer:
      "No. BuildLab #001 is designed for beginners. Mentors guide you from first assembly through calibration.",
  },
  {
    question: "Do I need to bring a laptop?",
    answer:
      "Yes. Bring a laptop so you can program and flash firmware during the workshop. Tell us on the form if you do not own one.",
  },
  {
    question: "Will I keep the robot?",
    answer:
      "Yes. You take home the walking robot you assemble and program.",
  },
  {
    question: "What programming software will be used?",
    answer:
      "Arduino IDE. You will write and upload firmware to the ESP32 board on your laptop.",
  },
  {
    question: "Is this beginner friendly?",
    answer:
      "Yes. The workshop is beginner friendly. No prior robotics background is required.",
  },
  {
    question: "Can students from any branch join?",
    answer:
      "Yes. Students from any branch can join. Curiosity and willingness to build matter more than your department.",
  },
];

export const buildLabFinalCta = {
  headline: "Ready to Build Your First Robot?",
  support:
    "Register for the ESP32 Walking Robot Workshop by Robotics & Automation Club, TSEC. Then keep building with the Aurigen code library and builder tools.",
  primary: { label: "Reserve Your Seat", href: "#register" },
};

export const buildLabSectionNav = [
  { id: "register", label: "Register" },
  { id: "build", label: "Build" },
  { id: "learn", label: "Learn" },
  { id: "experience", label: "Experience" },
  { id: "gallery", label: "Gallery" },
  { id: "audience", label: "Who" },
  { id: "included", label: "Included" },
  { id: "mentors", label: "Mentors" },
  { id: "faq", label: "FAQ" },
] as const;

export const buildLabExperienceOptions = [
  { value: "none", label: "None" },
  { value: "beginner", label: "Beginner exposure" },
  { value: "project", label: "Built a project before" },
  { value: "competition", label: "Competition experience" },
] as const;

export const buildLabYearOptions = [
  { value: "first", label: "First Year" },
  { value: "second", label: "Second Year" },
  { value: "third", label: "Third Year" },
  { value: "fourth", label: "Fourth Year" },
  { value: "other", label: "Other" },
] as const;

export const buildLabLaptopOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

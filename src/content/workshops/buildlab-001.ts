/**
 * Aurigen BuildLab #001 content module.
 * Swap media paths, copy, and FAQ here without touching layout components.
 *
 * Media lives under public/workshops/buildlab-001/.
 * Missing files fall back to branded placeholders in the UI.
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
  name: "Aurigen BuildLab #001",
  title: "Build Your Own ESP32 Walking Robot",
  subtitle:
    "Build, program, and take home your own walking robot while learning real robotics through hands-on engineering.",
  tagline: "Build. Program. Walk. Take It Home.",
  description:
    "Join Aurigen BuildLab #001. Assemble a real quadruped robot, program it with Arduino IDE, calibrate it, and take home a working robot you built yourself.",
};

export const buildLabHero = {
  headline: "Build Your Own ESP32 Walking Robot",
  support:
    "Join Aurigen BuildLab #001 and experience robotics the way it should be learned. Assemble a real quadruped robot, program it using Arduino IDE, calibrate it, and take home a fully functional robot built entirely by you.",
  badges: [
    "Beginner Friendly",
    "Hands-on Learning",
    "Take Home Robot",
    "Limited Seats",
    "ESP32 Powered",
  ] as const,
  floatingChips: [
    "ESP32 Powered",
    "Beginner Friendly",
    "Take Home Project",
    "Hands-on Workshop",
  ] as const,
  primaryCta: { label: "Register Now", href: "#register" },
  secondaryCta: { label: "Watch Robot Demo", href: "#gallery" },
};

export const buildLabFeatures = [
  "ESP32-S3 Controller",
  "Bluetooth Communication",
  "OLED Display",
  "Servo Powered Legs",
  "Rechargeable Battery",
  "Open Source Design",
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
  "Bluetooth Communication",
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
  "Certificate of Participation",
  "Take-home Robot",
  "Aurigen Community Access",
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
    "Join Aurigen BuildLab #001 and start your robotics journey by building something real.",
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

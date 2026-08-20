/**
 * Shared domain types for the Aurigen Builder / Workshop platform.
 * ESP32 Walking Robot is the first workshop implementation.
 */

export type PublishStatus =
  | "draft"
  | "pending"
  | "approved"
  | "published"
  | "featured"
  | "archived"
  | "rejected"
  | "winner";

export type AwardCategory =
  | "best-vlog"
  | "best-hack"
  | "fast-learner"
  | "innovation"
  | "best-story"
  | "best-technical"
  | "most-entertaining"
  | "best-transformation"
  | "winner";

export type MediaKind = "image" | "video" | "document" | "other";

export type CodeModuleTier =
  | "start-here"
  | "workshop"
  | "challenge"
  | "community";

export type Workshop = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  organizer: string;
  organizerShort: string;
  college: string;
  venue?: string;
  dates: {
    day1: { label: string; start: string; end: string };
    day2: { label: string; start: string; end: string };
  };
  teamSize: { min: number; max: number };
  philosophy: string[];
  hardware: string[];
  path: string;
};

/**
 * Public participant. No email, phone, WhatsApp, or Drive refs.
 * Those stay in the GAS registration sheet only.
 */
export type Participant = {
  id: string;
  firstName: string;
  lastName?: string;
  role?: string;
};

/**
 * Private registration contact. Never import this into public UI or seed data.
 * Source of truth: Google Apps Script Registrations sheet.
 */
export type PrivateRegistrationContact = {
  email: string;
  phone: string;
  whatsapp: string;
};

export type Team = {
  botId: string;
  teamName: string;
  members: Participant[];
  college: string;
  workshopId: string;
  createdAt?: string;
};

export type Media = {
  id: string;
  kind: MediaKind;
  src: string;
  alt: string;
  caption?: string;
  /** Private storage refs must never be rendered publicly. */
  private?: boolean;
};

export type Award = {
  id: string;
  category: AwardCategory;
  label: string;
  awardedAt?: string;
};

export type Project = {
  botId: string;
  robotName: string;
  teamName: string;
  members: string[];
  college: string;
  workshopName: string;
  workshopId: string;
  date: string;
  description: string;
  features: string[];
  tech: string[];
  images: Media[];
  demoUrl?: string;
  githubUrl?: string;
  vlogUrl?: string;
  awards: Award[];
  score: number;
  featured: boolean;
  status: PublishStatus;
  /** Demo/sample seed flagged so UI can label it. */
  isSample?: boolean;
};

export type CodeSnippet = {
  filename: string;
  language: string;
  code: string;
};

export type CodeModule = {
  id: string;
  order: number;
  slug: string;
  title: string;
  tier: CodeModuleTier;
  objective: string;
  learn: string[];
  wiring: string[];
  code: CodeSnippet[];
  explanation: string;
  expectedResult: string;
  commonMistakes: string[];
  nextStep?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
};

export type VlogSubmission = {
  id: string;
  botId: string;
  teamName: string;
  videoUrl: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  description: string;
  githubUrl?: string;
  consent: boolean;
  status: PublishStatus;
  createdAt: string;
  category?: AwardCategory;
};

export type ChallengeDay = {
  day: number;
  title: string;
  mission: string;
  objective: string;
  difficulty: "easy" | "medium" | "hard";
  resources: { label: string; href: string }[];
  starterModuleId?: string;
  points: number;
};

export type Challenge = {
  id: string;
  workshopId: string;
  title: string;
  subtitle: string;
  days: ChallengeDay[];
};

export type ChallengeProgress = {
  botId: string;
  completedDays: number[];
  updatedAt: string;
};

export type ChallengeSubmission = {
  id: string;
  botId: string;
  day: number;
  notes?: string;
  mediaUrl?: string;
  status: PublishStatus;
  createdAt: string;
};

export type SocialTemplateId = "we-built" | "alive" | "build-complete";

export type SocialGeneratorInput = {
  teamName: string;
  botId: string;
  members: string;
  robotName: string;
  feature: string;
  award: string;
  photoDataUrl?: string;
};

export type SocialTemplate = {
  id: SocialTemplateId;
  name: string;
  description: string;
};

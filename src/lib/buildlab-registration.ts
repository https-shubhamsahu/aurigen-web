/**
 * Client-side types, validation, and GAS submission for BuildLab #001.
 * Static export has no Next.js API route. The browser POSTs to the Apps Script URL.
 */

import {
  getBuildLabGasUrl,
  getWhatsAppNumber,
} from "@/lib/buildlab-config";

export { getBuildLabGasUrl, getWhatsAppNumber } from "@/lib/buildlab-config";

export type BuildLabLaptop = "yes" | "no";
export type BuildLabExperience =
  | "none"
  | "beginner"
  | "project"
  | "competition";
export type BuildLabYear =
  | "first"
  | "second"
  | "third"
  | "fourth"
  | "other";

export type BuildLabRegistrationPayload = {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  collegeName: string;
  branch: string;
  year: BuildLabYear;
  ownsLaptop: BuildLabLaptop;
  experience: BuildLabExperience;
  motivation: string;
  consent: boolean;
  workshopId: "buildlab-001";
  source: string;
};

export type BuildLabFieldErrors = Partial<
  Record<keyof BuildLabRegistrationPayload, string>
>;

export type BuildLabGasResponse = {
  ok: boolean;
  message?: string;
  code?: "duplicate" | "validation" | "error";
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{8,20}$/;

function trim(value: string): string {
  return value.trim();
}

export function validateBuildLabRegistration(
  raw: BuildLabRegistrationPayload,
): BuildLabFieldErrors {
  const errors: BuildLabFieldErrors = {};
  const fullName = trim(raw.fullName);
  const email = trim(raw.email).toLowerCase();
  const phone = trim(raw.phone);
  const whatsapp = trim(raw.whatsapp);
  const collegeName = trim(raw.collegeName);
  const branch = trim(raw.branch);

  if (!fullName || fullName.length < 2) {
    errors.fullName = "Enter your full name.";
  }
  if (!email || !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!phone || !PHONE_RE.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!whatsapp || !PHONE_RE.test(whatsapp)) {
    errors.whatsapp = "Enter a valid WhatsApp number.";
  }
  if (!collegeName) {
    errors.collegeName = "Enter your college name.";
  }
  if (!branch) {
    errors.branch = "Enter your branch.";
  }
  if (!raw.year) {
    errors.year = "Select your year.";
  }
  if (!raw.ownsLaptop) {
    errors.ownsLaptop = "Select whether you own a laptop.";
  }
  if (!raw.experience) {
    errors.experience = "Select your previous robotics experience.";
  }
  if (!raw.consent) {
    errors.consent = "Consent is required to reserve a seat.";
  }

  return errors;
}

export function normalizeBuildLabRegistration(
  raw: BuildLabRegistrationPayload,
): BuildLabRegistrationPayload {
  return {
    ...raw,
    fullName: trim(raw.fullName),
    email: trim(raw.email).toLowerCase(),
    phone: trim(raw.phone),
    whatsapp: trim(raw.whatsapp),
    collegeName: trim(raw.collegeName),
    branch: trim(raw.branch),
    motivation: trim(raw.motivation),
    workshopId: "buildlab-001",
  };
}

export async function submitBuildLabRegistration(
  payload: BuildLabRegistrationPayload,
): Promise<BuildLabGasResponse> {
  const url = getBuildLabGasUrl();
  const body = normalizeBuildLabRegistration(payload);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    const text = await res.text();
    let data: BuildLabGasResponse | null = null;
    try {
      data = JSON.parse(text) as BuildLabGasResponse;
    } catch {
      data = null;
    }

    if (!res.ok) {
      return {
        ok: false,
        code: data?.code ?? "error",
        message:
          data?.message ||
          "Registration failed. Please try again in a moment.",
      };
    }

    if (data && typeof data.ok === "boolean") {
      return data;
    }

    return {
      ok: true,
      message: "Registration received. Check your email for confirmation.",
    };
  } catch {
    return {
      ok: false,
      code: "error",
      message:
        "Could not reach the registration service. Check your connection and try again.",
    };
  }
}

/** WhatsApp chat link. Digits-only number with country code (see buildlab-config). */
export function getWhatsAppHref(message?: string): string {
  const number = getWhatsAppNumber();
  const text =
    message ??
    "Hi, I have a question about the ESP32 Walking Robot Workshop (RAC TSEC).";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

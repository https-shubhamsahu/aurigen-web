"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  buildLabExperienceOptions,
  buildLabLaptopOptions,
  buildLabYearOptions,
} from "@/content/workshops/buildlab-001";
import { track } from "@/lib/analytics";
import {
  submitBuildLabRegistration,
  validateBuildLabRegistration,
  type BuildLabExperience,
  type BuildLabFieldErrors,
  type BuildLabLaptop,
  type BuildLabRegistrationPayload,
  type BuildLabYear,
} from "@/lib/buildlab-registration";
import { cn } from "@/lib/utils";

const initialForm: BuildLabRegistrationPayload = {
  fullName: "",
  email: "",
  phone: "",
  whatsapp: "",
  collegeName: "",
  branch: "",
  year: "" as BuildLabYear,
  ownsLaptop: "" as BuildLabLaptop,
  experience: "" as BuildLabExperience,
  motivation: "",
  consent: false,
  workshopId: "buildlab-001",
  source: "buildlab-001-page",
};

type Status = "idle" | "loading" | "success" | "error";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-xs text-destructive" role="alert">
      {message}
    </p>
  );
}

export function BuildLabRegistrationForm({
  className,
}: {
  className?: string;
}) {
  const [form, setForm] = useState<BuildLabRegistrationPayload>(initialForm);
  const [errors, setErrors] = useState<BuildLabFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const submittedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setForm((prev) => ({
        ...prev,
        source: window.location.pathname || "buildlab-001-page",
      }));
    }
  }, []);

  const busy = status === "loading" || isPending;

  function update<K extends keyof BuildLabRegistrationPayload>(
    key: K,
    value: BuildLabRegistrationPayload[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittedRef.current && status === "success") return;
    if (status === "loading") return;

    const fieldErrors = validateBuildLabRegistration(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setStatus("error");
      setMessage("Please fix the highlighted fields.");
      track("workshop_register_validation_error", {
        workshop: "buildlab-001",
        fields: Object.keys(fieldErrors).join(","),
      });
      return;
    }

    setErrors({});
    setStatus("loading");
    setMessage("");
    track("workshop_register_submit", {
      workshop: "buildlab-001",
      year: form.year,
      experience: form.experience,
      ownsLaptop: form.ownsLaptop,
    });

    startTransition(async () => {
      const result = await submitBuildLabRegistration(form);
      if (result.ok) {
        submittedRef.current = true;
        setStatus("success");
        setMessage(
          result.message ||
            "Registration received. Check your email for confirmation.",
        );
        track("workshop_register_success", { workshop: "buildlab-001" });
      } else {
        setStatus("error");
        setMessage(
          result.message ||
            "Registration failed. Please try again in a moment.",
        );
        track("workshop_register_error", {
          workshop: "buildlab-001",
          code: result.code ?? "error",
        });
      }
    });
  }

  if (status === "success") {
    return (
      <div
        id="register"
        className={cn(
          "scroll-mt-28 border border-white/10 bg-card p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-8",
          className,
        )}
      >
        <div className="flex flex-col items-start gap-4">
          <span className="flex size-12 items-center justify-center border border-accent/30 bg-accent/10 text-accent">
            <CheckCircle2 className="size-6" aria-hidden />
          </span>
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              Registration received
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="register"
      className={cn(
        "scroll-mt-28 border border-white/10 bg-card p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-8",
        className,
      )}
    >
      <div className="mb-6">
        <p className="mb-2 text-xs font-heading font-semibold uppercase tracking-[0.16em] text-accent">
          BuildLab #001
        </p>
        <h3 className="text-xl font-bold tracking-tight md:text-2xl">
          Reserve My Seat
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Limited seats. We will confirm your registration by email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="bl-fullName">Full Name</Label>
            <Input
              id="bl-fullName"
              name="fullName"
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              className="h-11 rounded-md"
              disabled={busy}
            />
            <FieldError message={errors.fullName} />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="bl-email">Email Address</Label>
            <Input
              id="bl-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              className="h-11 rounded-md"
              disabled={busy}
            />
            <FieldError message={errors.email} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bl-phone">Phone Number</Label>
            <Input
              id="bl-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={Boolean(errors.phone)}
              className="h-11 rounded-md"
              disabled={busy}
            />
            <FieldError message={errors.phone} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bl-whatsapp">WhatsApp Number</Label>
            <Input
              id="bl-whatsapp"
              name="whatsapp"
              type="tel"
              value={form.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
              aria-invalid={Boolean(errors.whatsapp)}
              className="h-11 rounded-md"
              disabled={busy}
            />
            <FieldError message={errors.whatsapp} />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="bl-college">College Name</Label>
            <Input
              id="bl-college"
              name="collegeName"
              value={form.collegeName}
              onChange={(e) => update("collegeName", e.target.value)}
              aria-invalid={Boolean(errors.collegeName)}
              className="h-11 rounded-md"
              disabled={busy}
            />
            <FieldError message={errors.collegeName} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bl-branch">Branch</Label>
            <Input
              id="bl-branch"
              name="branch"
              value={form.branch}
              onChange={(e) => update("branch", e.target.value)}
              aria-invalid={Boolean(errors.branch)}
              className="h-11 rounded-md"
              disabled={busy}
            />
            <FieldError message={errors.branch} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bl-year">Year</Label>
            <select
              id="bl-year"
              name="year"
              value={form.year}
              onChange={(e) => update("year", e.target.value as BuildLabYear)}
              aria-invalid={Boolean(errors.year)}
              disabled={busy}
              className="h-11 w-full rounded-md border border-input bg-zinc-950 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
            >
              <option value="">Select year</option>
              {buildLabYearOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <FieldError message={errors.year} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bl-laptop">Do you own a laptop?</Label>
            <select
              id="bl-laptop"
              name="ownsLaptop"
              value={form.ownsLaptop}
              onChange={(e) =>
                update("ownsLaptop", e.target.value as BuildLabLaptop)
              }
              aria-invalid={Boolean(errors.ownsLaptop)}
              disabled={busy}
              className="h-11 w-full rounded-md border border-input bg-zinc-950 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
            >
              <option value="">Select</option>
              {buildLabLaptopOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <FieldError message={errors.ownsLaptop} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bl-experience">Previous robotics experience</Label>
            <select
              id="bl-experience"
              name="experience"
              value={form.experience}
              onChange={(e) =>
                update("experience", e.target.value as BuildLabExperience)
              }
              aria-invalid={Boolean(errors.experience)}
              disabled={busy}
              className="h-11 w-full rounded-md border border-input bg-zinc-950 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
            >
              <option value="">Select experience</option>
              {buildLabExperienceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <FieldError message={errors.experience} />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="bl-motivation">
              Why do you want to join?{" "}
              <span className="font-normal text-muted-foreground">(Optional)</span>
            </Label>
            <textarea
              id="bl-motivation"
              name="motivation"
              rows={3}
              value={form.motivation}
              onChange={(e) => update("motivation", e.target.value)}
              disabled={busy}
              className="w-full resize-y rounded-md border border-input bg-zinc-950 px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
            />
          </div>
        </div>

        <label className="flex items-start gap-3 pt-1 text-sm leading-snug text-muted-foreground">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            disabled={busy}
            className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            I agree to be contacted about BuildLab registration and workshop
            updates.
          </span>
        </label>
        <FieldError message={errors.consent} />

        <Button
          type="submit"
          size="lg"
          disabled={busy}
          className="mt-2 h-12 w-full"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
                  Reserving seat...
            </>
          ) : (
            <>
              Reserve My Seat
              <Send className="size-4" aria-hidden />
            </>
          )}
        </Button>

        {status === "error" && message ? (
          <p className="text-center text-xs text-destructive" role="alert">
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}

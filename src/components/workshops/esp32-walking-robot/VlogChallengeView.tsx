"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DemoModeBanner } from "@/components/workshops/esp32-walking-robot/DemoModeBanner";
import { BOT_ID_EXAMPLE, isValidBotId } from "@/lib/bot-id";
import {
  getVlogServiceDescription,
  getVlogServiceLabel,
  listPublicVlogs,
  submitVlog,
} from "@/lib/vlog-service";
import { isWorkshopRuntimeConfigured } from "@/lib/workshop-runtime";
import { track } from "@/lib/analytics";
import type { VlogSubmission } from "@/types/workshop-ecosystem";
import { vlogBrief } from "@/content/workshops/esp32-walking-robot/vlog";

type FormState = {
  botId: string;
  teamName: string;
  videoUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  description: string;
  githubUrl: string;
  consent: boolean;
};

const empty: FormState = {
  botId: "",
  teamName: "",
  videoUrl: "",
  instagramUrl: "",
  youtubeUrl: "",
  description: "",
  githubUrl: "",
  consent: false,
};

export function VlogChallengeView() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [gallery, setGallery] = useState<VlogSubmission[]>([]);
  const [galleryNote, setGalleryNote] = useState("");
  const sheetReady = isWorkshopRuntimeConfigured();

  useEffect(() => {
    track("vlog_page_viewed", {});
    listPublicVlogs()
      .then(setGallery)
      .catch(() => {
        setGallery([]);
        setGalleryNote("Could not load the shared sheet gallery.");
      });
  }, []);

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!isValidBotId(form.botId)) {
      next.botId = `Use a BOT ID like ${BOT_ID_EXAMPLE}.`;
    }
    if (form.teamName.trim().length < 2) next.teamName = "Enter team name.";
    if (!/^https?:\/\//i.test(form.videoUrl.trim())) {
      next.videoUrl = "Enter a valid video URL.";
    }
    if (form.description.trim().length < 10) {
      next.description = "Add a short description.";
    }
    if (!form.consent) next.consent = "Consent is required to feature the vlog.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("saving");
    setMessage("");

    try {
      const result = await submitVlog({
        botId: form.botId,
        teamName: form.teamName.trim(),
        videoUrl: form.videoUrl.trim(),
        instagramUrl: form.instagramUrl.trim() || undefined,
        youtubeUrl: form.youtubeUrl.trim() || undefined,
        description: form.description.trim(),
        githubUrl: form.githubUrl.trim() || undefined,
        consent: form.consent,
      });

      track("vlog_submitted", {
        botId: form.botId,
        ok: result.ok,
        code: result.code || "ok",
      });

      if (result.ok) {
        setStatus("ok");
        setMessage(
          "Saved to shared sheet. The public gallery shows it after a mentor sets Status to approved, featured, or winner.",
        );
        setForm(empty);
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    } catch {
      setStatus("error");
      setMessage("Could not save submission. Try again.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
        Vlog Challenge
      </p>
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {vlogBrief.headline}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        {vlogBrief.support}
      </p>

      <div className="mt-6">
        <DemoModeBanner
          title={getVlogServiceLabel()}
          body={getVlogServiceDescription()}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {vlogBrief.beats.map((b) => (
          <span
            key={b}
            className="rounded-sm border border-white/10 px-2.5 py-1 text-xs text-muted-foreground"
          >
            {b}
          </span>
        ))}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-heading text-xl font-semibold">Rules</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {vlogBrief.rules.map((r) => (
              <li key={r}>• {r}</li>
            ))}
          </ul>
          <h2 className="mt-8 font-heading text-xl font-semibold">Categories</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {vlogBrief.categories.map((c) => (
              <li key={c}>• {c}</li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-md border border-white/10 bg-card p-5 md:p-6"
        >
          <Field label="BOT ID" error={errors.botId}>
            <Input
              value={form.botId}
              onChange={(e) => setForm({ ...form, botId: e.target.value })}
              placeholder={BOT_ID_EXAMPLE}
              autoComplete="off"
            />
          </Field>
          <Field label="Team name" error={errors.teamName}>
            <Input
              value={form.teamName}
              onChange={(e) => setForm({ ...form, teamName: e.target.value })}
              placeholder="Team name"
            />
          </Field>
          <Field label="Video URL" error={errors.videoUrl}>
            <Input
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              placeholder="https://"
              inputMode="url"
            />
          </Field>
          <Field label="Instagram URL (optional)">
            <Input
              value={form.instagramUrl}
              onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
              placeholder="https://instagram.com/..."
            />
          </Field>
          <Field label="YouTube URL (optional)">
            <Input
              value={form.youtubeUrl}
              onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
              placeholder="https://youtube.com/..."
            />
          </Field>
          <Field label="Short description" error={errors.description}>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              placeholder="What did you build, break, and fix?"
            />
          </Field>
          <Field label="GitHub (optional)">
            <Input
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              placeholder="https://github.com/..."
            />
          </Field>
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-1 min-h-4 min-w-4"
            />
            <span>
              I consent to featuring or reposting this vlog in the public gallery
              if approved.
              {errors.consent ? (
                <span className="mt-1 block text-destructive">{errors.consent}</span>
              ) : null}
            </span>
          </label>
          <Button type="submit" size="lg" disabled={status === "saving"} className="w-full sm:w-auto">
            {status === "saving" ? "Saving..." : "Submit vlog"}
          </Button>
          {message ? (
            <p
              className={
                status === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"
              }
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>

      <div className="mt-16">
        <h2 className="font-heading text-2xl font-semibold">Gallery</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Only rows with Status approved, featured, or winner appear here. Mentors
          moderate in the private Google Sheet. This website is public.
        </p>
        {galleryNote ? (
          <p className="mt-2 text-sm text-destructive">{galleryNote}</p>
        ) : null}
        {gallery.length === 0 ? (
          <div className="mt-6 rounded-md border border-dashed border-white/15 px-6 py-12 text-center text-sm text-muted-foreground">
            {sheetReady
              ? "No approved vlogs yet."
              : "Submissions go live after the shared sheet is connected. Set NEXT_PUBLIC_WORKSHOP_RUNTIME_GAS_URL and rebuild."}
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {gallery.map((v) => (
              <li
                key={v.id}
                className="rounded-md border border-white/10 bg-card p-4"
              >
                <p className="font-mono text-xs text-accent">{v.botId}</p>
                <p className="mt-1 font-heading font-semibold">{v.teamName}</p>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
                <a
                  href={v.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex min-h-10 items-center text-sm text-accent hover:underline"
                  onClick={() => track("vlog_viewed", { botId: v.botId })}
                >
                  Watch
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

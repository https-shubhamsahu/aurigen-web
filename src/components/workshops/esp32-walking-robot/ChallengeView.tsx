"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DemoModeBanner } from "@/components/workshops/esp32-walking-robot/DemoModeBanner";
import { BOT_ID_EXAMPLE, isValidBotId, normalizeBotId } from "@/lib/bot-id";
import {
  getChallenge,
  getChallengeScore,
  getChallengeStorageDescription,
  getChallengeStorageLabel,
  loadChallengeProgress,
  saveChallengeProgress,
} from "@/lib/challenge-service";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function ChallengeView() {
  const challenge = getChallenge();
  const [botId, setBotId] = useState("");
  const [completed, setCompleted] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [note, setNote] = useState("");

  const { score, max } = useMemo(
    () => getChallengeScore(completed),
    [completed],
  );

  useEffect(() => {
    track("challenge_page_viewed", { challengeId: challenge.id });
  }, [challenge.id]);

  async function loadProgress() {
    const id = normalizeBotId(botId);
    if (!isValidBotId(id)) {
      setNote(`Enter a valid BOT ID like ${BOT_ID_EXAMPLE}.`);
      return;
    }
    const progress = await loadChallengeProgress(id);
    setCompleted(progress?.completedDays ?? []);
    setLoaded(true);
    setNote(`Progress loaded for ${id} on this device.`);
    track("challenge_started", { botId: id });
  }

  async function toggleDay(day: number) {
    const id = normalizeBotId(botId);
    if (!isValidBotId(id)) {
      setNote("Set your BOT ID first.");
      return;
    }
    const next = completed.includes(day)
      ? completed.filter((d) => d !== day)
      : [...completed, day].sort((a, b) => a - b);
    setCompleted(next);
    await saveChallengeProgress(id, next);
    if (!completed.includes(day)) {
      track("challenge_completed", { botId: id, day });
    }
    track("challenge_progress_saved", { botId: id, days: next.length });
    setLoaded(true);
    setNote("Saved on this device.");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
        Post-workshop
      </p>
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {challenge.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        {challenge.subtitle}
      </p>

      <div className="mt-6">
        <DemoModeBanner
          title={getChallengeStorageLabel()}
          body={getChallengeStorageDescription()}
        />
      </div>

      <div className="mt-8 flex flex-col gap-3 rounded-md border border-white/10 bg-card p-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="bot-id">BOT ID</Label>
          <Input
            id="bot-id"
            value={botId}
            onChange={(e) => setBotId(e.target.value)}
            placeholder={BOT_ID_EXAMPLE}
            autoComplete="off"
          />
        </div>
        <Button type="button" onClick={loadProgress} className="min-h-10 sm:mb-0.5">
          Load progress
        </Button>
      </div>
      {note ? <p className="mt-3 text-sm text-muted-foreground">{note}</p> : null}

      <div className="mt-8 rounded-md border border-white/10 bg-card p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Robot Builder Score
            </p>
            <p className="mt-1 font-heading text-3xl font-semibold text-accent">
              {score}
              <span className="text-lg text-muted-foreground"> / {max}</span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {completed.length} / {challenge.days.length} days done
            {loaded ? "" : " · enter BOT ID to sync"}
          </p>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-accent transition-all"
            style={{ width: `${Math.round((score / max) * 100)}%` }}
          />
        </div>
      </div>

      <ol className="mt-10 space-y-4">
        {challenge.days.map((day) => {
          const done = completed.includes(day.day);
          return (
            <li
              key={day.day}
              className={cn(
                "rounded-md border p-5",
                done ? "border-accent/40 bg-accent/5" : "border-white/10 bg-card",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-accent">Day {day.day}</p>
                  <h2 className="mt-1 font-heading text-xl font-semibold">
                    {day.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{day.mission}</p>
                </div>
                <div className="text-right text-xs uppercase tracking-wide text-muted-foreground">
                  <p>{day.difficulty}</p>
                  <p className="mt-1">{day.points} pts</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{day.objective}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {day.resources.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="inline-flex min-h-10 items-center text-sm text-accent hover:underline"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
              <div className="mt-5">
                <Button
                  type="button"
                  variant={done ? "outline" : "default"}
                  className="min-h-10 w-full sm:w-auto"
                  onClick={() => toggleDay(day.day)}
                >
                  {done ? "Mark incomplete" : "Mark complete"}
                </Button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

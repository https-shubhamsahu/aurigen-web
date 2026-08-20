/**
 * 7-Day challenge is POST-workshop and per-browser.
 * This is not a shared leaderboard. Mentors who need a global view use the Sheet.
 */

import {
  maxBuilderScore,
  scoreForDays,
  sevenDayChallenge,
} from "@/content/workshops/esp32-walking-robot/challenge";
import { getStorageProvider } from "@/lib/storage";
import { normalizeBotId } from "@/lib/bot-id";
import type { Challenge, ChallengeProgress } from "@/types/workshop-ecosystem";

export function getChallenge(): Challenge {
  return sevenDayChallenge;
}

export function getChallengeScore(completedDays: number[]): {
  score: number;
  max: number;
} {
  return { score: scoreForDays(completedDays), max: maxBuilderScore() };
}

export function getChallengeStorageLabel(): string {
  return "Post-workshop tracker on this device";
}

export function getChallengeStorageDescription(): string {
  return "This 7-day challenge starts after the workshop. Progress is stored in this browser only. It is not a global leaderboard. Clearing site data or switching phones resets the score.";
}

export async function loadChallengeProgress(
  botId: string,
): Promise<ChallengeProgress | null> {
  return getStorageProvider().getChallengeProgress(normalizeBotId(botId));
}

export async function saveChallengeProgress(
  botId: string,
  completedDays: number[],
): Promise<ChallengeProgress> {
  const progress: ChallengeProgress = {
    botId: normalizeBotId(botId),
    completedDays,
    updatedAt: new Date().toISOString(),
  };
  await getStorageProvider().saveChallengeProgress(progress);
  return progress;
}

/**
 * Challenge progress: content model in challenge.ts, storage via StorageProvider.
 * Browser localStorage only unless NEXT_PUBLIC_CHALLENGE_GAS_URL is set.
 */

import {
  maxBuilderScore,
  scoreForDays,
  sevenDayChallenge,
} from "@/content/workshops/esp32-walking-robot/challenge";
import { getStorageProvider } from "@/lib/storage";
import { getChallengeGasUrl } from "@/lib/workshop-config";
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
  return getChallengeGasUrl()
    ? "Saved on this device, with an optional remote copy"
    : "Saved on this device only";
}

export function getChallengeStorageDescription(): string {
  return "Progress lives in this browser's localStorage. It does not follow you to another phone or laptop. Clearing site data resets the score. This is not a shared leaderboard.";
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

  const gas = getChallengeGasUrl();
  if (gas) {
    try {
      await fetch(gas, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(progress),
      });
    } catch {
      /* local save already succeeded */
    }
  }

  return progress;
}

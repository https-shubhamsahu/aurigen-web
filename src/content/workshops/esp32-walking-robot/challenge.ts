/**
 * 7-Day Post-Workshop Challenge content.
 */

import { LAB_PATH } from "@/lib/workshop-config";
import type { Challenge } from "@/types/workshop-ecosystem";

export const sevenDayChallenge: Challenge = {
  id: "esp32-7-day",
  workshopId: "esp32-walking-robot",
  title: "7 Days. 7 Robot Hacks.",
  subtitle:
    "Post-workshop. One mission a day on this device. This score is not a shared leaderboard.",
  days: [
    {
      day: 1,
      title: "OLED Personality",
      mission: "Change the OLED personality.",
      objective: "Ship a custom face or status screen that feels like your robot.",
      difficulty: "easy",
      resources: [
        { label: "OLED Eyes module", href: `${LAB_PATH}#module-07` },
      ],
      starterModuleId: "07",
      points: 10,
    },
    {
      day: 2,
      title: "New Movement",
      mission: "Add a new movement.",
      objective: "Add one motion beyond the workshop walk (sidestep, bow, or wave).",
      difficulty: "medium",
      resources: [
        { label: "Basic Movement", href: `${LAB_PATH}#module-05` },
        { label: "Robot Gait", href: `${LAB_PATH}#module-06` },
      ],
      starterModuleId: "05",
      points: 12,
    },
    {
      day: 3,
      title: "BLE Command",
      mission: "Add a new BLE command.",
      objective: "Expose one new wireless command and document how to trigger it.",
      difficulty: "medium",
      resources: [{ label: "BLE Control", href: `${LAB_PATH}#module-08` }],
      starterModuleId: "08",
      points: 14,
    },
    {
      day: 4,
      title: "Dance",
      mission: "Create a dance.",
      objective: "Choreograph a short routine with timed servo sequences.",
      difficulty: "medium",
      resources: [
        { label: "Complete Firmware", href: `${LAB_PATH}#module-09` },
      ],
      starterModuleId: "09",
      points: 14,
    },
    {
      day: 5,
      title: "Gait Upgrade",
      mission: "Improve the gait.",
      objective: "Reduce wobble or speed up walking without losing balance.",
      difficulty: "hard",
      resources: [{ label: "Robot Gait", href: `${LAB_PATH}#module-06` }],
      starterModuleId: "06",
      points: 16,
    },
    {
      day: 6,
      title: "Build Something Weird",
      mission: "Build something weird.",
      objective: "Ship a playful or unexpected feature. Document why it exists.",
      difficulty: "medium",
      resources: [{ label: "Challenges", href: `${LAB_PATH}#module-10` }],
      starterModuleId: "10",
      points: 12,
    },
    {
      day: 7,
      title: "Final Demo",
      mission: "Demo your final modification.",
      objective: "Record a short demo and list the three changes you are proud of.",
      difficulty: "easy",
      resources: [
        { label: "Troubleshooting", href: `${LAB_PATH}#module-11` },
        { label: "Vlog Challenge", href: "/workshops/esp32-walking-robot/vlog/" },
      ],
      starterModuleId: "11",
      points: 12,
    },
  ],
};

export function maxBuilderScore(): number {
  return sevenDayChallenge.days.reduce((sum, d) => sum + d.points, 0);
}

export function scoreForDays(completedDays: number[]): number {
  const set = new Set(completedDays);
  return sevenDayChallenge.days
    .filter((d) => set.has(d.day))
    .reduce((sum, d) => sum + d.points, 0);
}

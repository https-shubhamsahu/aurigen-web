import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { AboutHeader } from "@/components/about/AboutHeader";
import { googleDriveProvider } from "@/lib/storage";
import { BOT_ID_ASSIGNMENT_NOTE } from "@/lib/bot-id";
import {
  getChallengeGasUrl,
  getVlogGasUrl,
  WORKSHOP_PATH,
  LAB_PATH,
  BUILDERS_PATH,
  VLOG_PATH,
  CHALLENGE_PATH,
} from "@/lib/workshop-config";
import { getVlogServiceLabel } from "@/lib/vlog-service";
import { getChallengeStorageLabel } from "@/lib/challenge-service";

export const metadata: Metadata = {
  title: "Workshop Admin (Demo stub)",
  description:
    "Content workflow notes for the ESP32 Walking Robot ecosystem. No public auth on this static site.",
  robots: { index: false, follow: false },
};

/**
 * Gated-by-obscurity stub. Static export has no auth.
 * Real moderation needs a backend later. Do not treat this URL as secure.
 */
export default function WorkshopAdminStubPage() {
  const driveStatus = googleDriveProvider.statusMessage();
  const vlogGas = Boolean(getVlogGasUrl());
  const challengeGas = Boolean(getChallengeGasUrl());

  return (
    <>
      <AboutHeader />
      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-6 pb-20 pt-28 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
            Demo mode. Not secure admin.
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight">
            Workshop content workflow
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This static GitHub Pages site has no login, no session, and no
            database. Anyone who knows the URL can open this page. Use it as a
            checklist, not as a control panel.
          </p>

          <div className="mt-8 space-y-3 rounded-md border border-accent/30 bg-accent/10 p-5 text-sm">
            <p>
              <span className="font-heading font-semibold">Vlog:</span>{" "}
              {getVlogServiceLabel()}
            </p>
            <p>
              <span className="font-heading font-semibold">Challenge:</span>{" "}
              {getChallengeStorageLabel()}
            </p>
            <p>
              <span className="font-heading font-semibold">Drive:</span>{" "}
              {driveStatus}
            </p>
            <p>
              <span className="font-heading font-semibold">Optional GAS:</span>{" "}
              vlog {vlogGas ? "URL set" : "unset"}, challenge{" "}
              {challengeGas ? "URL set" : "unset"}.
            </p>
          </div>

          <ol className="mt-10 list-decimal space-y-6 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <p className="font-heading font-semibold text-foreground">
                Registration (live)
              </p>
              <p className="mt-1">
                Participants register on{" "}
                <Link
                  href="/workshops/buildlab-001/#register"
                  className="text-accent hover:underline"
                >
                  /workshops/buildlab-001/#register
                </Link>
                . The browser posts to Google Apps Script. Phone and email stay
                in the private sheet. Do not paste them into public content.
              </p>
            </li>
            <li>
              <p className="font-heading font-semibold text-foreground">
                BOT ID assignment (manual)
              </p>
              <p className="mt-1">{BOT_ID_ASSIGNMENT_NOTE}</p>
              <p className="mt-1">
                Keep a paper or sheet column: Team name, member count (1-5), BOT
                ID. Start at BOT-001. Never reuse. BOT-901+ is reserved for
                layout samples in code.
              </p>
            </li>
            <li>
              <p className="font-heading font-semibold text-foreground">
                During workshop
              </p>
              <p className="mt-1">
                Point teams at the hub, then Code Library. Do not change
                registration payload fields.
              </p>
            </li>
            <li>
              <p className="font-heading font-semibold text-foreground">
                Vlog moderation (future)
              </p>
              <p className="mt-1">
                Public form saves Pending in localStorage (and optional GAS if
                configured). To publish: copy an approved entry into{" "}
                <code className="text-xs text-accent">
                  src/content/workshops/esp32-walking-robot/vlog.ts
                </code>{" "}
                as status approved, featured, or winner. Rebuild and deploy.
              </p>
            </li>
            <li>
              <p className="font-heading font-semibold text-foreground">
                Builder profiles (future)
              </p>
              <p className="mt-1">
                Add consented public records to{" "}
                <code className="text-xs text-accent">
                  src/content/builders/seed.ts
                </code>
                . Set <code className="text-xs">isSample: false</code>. First
                names only. No phone, email, or private Drive URL. Remove or
                keep layout samples under BOT-901+ with isSample true.
              </p>
            </li>
            <li>
              <p className="font-heading font-semibold text-foreground">
                7-Day challenge
              </p>
              <p className="mt-1">
                Day copy lives in{" "}
                <code className="text-xs text-accent">
                  src/content/workshops/esp32-walking-robot/challenge.ts
                </code>
                . Progress is per-browser localStorage, not a shared
                leaderboard.
              </p>
            </li>
          </ol>

          <div className="mt-8 space-y-4 rounded-md border border-white/10 bg-card p-5 text-sm text-muted-foreground">
            <p>
              <span className="text-foreground">Hub copy:</span>{" "}
              <code className="text-xs text-accent">
                src/content/workshops/esp32-walking-robot/
              </code>
            </p>
            <p>
              <span className="text-foreground">Lab modules:</span>{" "}
              <code className="text-xs text-accent">
                src/content/labs/esp32-walking-robot/
              </code>
            </p>
            <p>
              <span className="text-foreground">Ops doc:</span>{" "}
              <code className="text-xs text-accent">
                docs/workshop-ecosystem.md
              </code>
            </p>
          </div>

          <ul className="mt-8 space-y-2 text-sm">
            <li>
              <Link href={WORKSHOP_PATH} className="text-accent hover:underline">
                Workshop hub
              </Link>
            </li>
            <li>
              <Link href={LAB_PATH} className="text-accent hover:underline">
                Code library
              </Link>
            </li>
            <li>
              <Link href={BUILDERS_PATH} className="text-accent hover:underline">
                Builders
              </Link>
            </li>
            <li>
              <Link href={VLOG_PATH} className="text-accent hover:underline">
                Vlog
              </Link>
            </li>
            <li>
              <Link href={CHALLENGE_PATH} className="text-accent hover:underline">
                7-Day challenge
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

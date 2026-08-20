import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { AboutHeader } from "@/components/about/AboutHeader";
import { BOT_ID_ASSIGNMENT_NOTE } from "@/lib/bot-id";
import {
  isWorkshopRuntimeConfigured,
  getWorkshopRuntimeLabel,
} from "@/lib/workshop-runtime";
import {
  WORKSHOP_PATH,
  LAB_PATH,
  BUILDERS_PATH,
  VLOG_PATH,
  CHALLENGE_PATH,
} from "@/lib/workshop-config";

export const metadata: Metadata = {
  title: "Workshop admin is public",
  description:
    "This URL is public. Real moderation is the private Google Sheet. No login on this static site.",
  robots: { index: false, follow: false },
};

/**
 * This URL is public. Static GitHub Pages has no auth.
 * Real admin = the private Google Sheet (see docs/workshop-runtime-gas.md).
 */
export default function WorkshopAdminStubPage() {
  const sheetReady = isWorkshopRuntimeConfigured();

  return (
    <>
      <AboutHeader />
      <main className="min-h-screen">
        <section className="mx-auto max-w-3xl px-6 pb-20 pt-28 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
            This URL is public
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight">
            Real moderation is the Google Sheet
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            This is a static GitHub Pages site. There is no login and no private
            admin. Anyone who knows this URL can open it. Mentors approve vlogs
            by editing Status on the private Sheet, then sharing that Sheet with
            people who should moderate.
          </p>

          <div className="mt-8 space-y-3 rounded-md border border-accent/30 bg-accent/10 p-5 text-sm">
            <p>
              <span className="font-heading font-semibold">Shared sheet:</span>{" "}
              {getWorkshopRuntimeLabel()}
              {sheetReady ? "" : ". Set NEXT_PUBLIC_WORKSHOP_RUNTIME_GAS_URL and rebuild."}
            </p>
            <p>
              Setup steps:{" "}
              <code className="text-xs text-accent">docs/workshop-runtime-gas.md</code>
            </p>
          </div>

          <ol className="mt-10 list-decimal space-y-6 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <p className="font-heading font-semibold text-foreground">
                Registration is off this site
              </p>
              <p className="mt-1">
                The college did not allow website registration. Teams signed up
                through a Google Form. The 14 roster teams are on{" "}
                <Link href={BUILDERS_PATH} className="text-accent hover:underline">
                  /builders/
                </Link>
                . Do not add a signup form here.
              </p>
            </li>
            <li>
              <p className="font-heading font-semibold text-foreground">
                BOT IDs
              </p>
              <p className="mt-1">{BOT_ID_ASSIGNMENT_NOTE}</p>
            </li>
            <li>
              <p className="font-heading font-semibold text-foreground">
                Approve vlogs in the Sheet
              </p>
              <p className="mt-1">
                New rows land as pending. Set Status to approved, featured, or
                winner. Leave pending or blank to keep a row off the public
                gallery. Public GET never returns pending, phone, or email.
              </p>
            </li>
            <li>
              <p className="font-heading font-semibold text-foreground">
                7-Day challenge
              </p>
              <p className="mt-1">
                Post-workshop personal tracker on each phone. Not a global
                leaderboard.
              </p>
            </li>
          </ol>

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
                7-Day challenge (post-workshop)
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

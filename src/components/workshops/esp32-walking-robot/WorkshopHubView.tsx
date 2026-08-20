"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  challengesPreview,
  continueBuilding,
  ecosystemLinks,
  fieldGuideLinks,
  journeyDay1,
  journeyDay2,
  postWorkshopNote,
  robotSpecs,
  workshop,
  workshopHero,
  workshopMedia,
  workshopOverview,
} from "@/content/workshops/esp32-walking-robot";
import { listPublicBuilders } from "@/content/builders/seed";
import { BuilderCard } from "@/components/builders/BuilderCard";
import { fadeUp, stagger } from "@/lib/motion";
import { track } from "@/lib/analytics";

export function WorkshopHubView() {
  const reduced = useReducedMotion();
  const featured = listPublicBuilders().filter((p) => p.featured).slice(0, 3);

  useEffect(() => {
    track("workshop_hub_viewed", { workshopId: workshop.id });
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] grid-mesh" aria-hidden />
        <div
          className="pointer-events-none absolute -top-24 right-0 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <motion.div {...(reduced ? {} : fadeUp)}>
            <div className="mb-5 flex items-center gap-3">
              <Image
                src={workshopMedia.racLogo}
                alt="Robotics & Automation Club logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-sm object-contain"
              />
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {workshopHero.organizerLine}
              </p>
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {workshopHero.brand}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {workshopHero.support}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-foreground">
              <MetaChip>{workshopHero.datesLine}</MetaChip>
              <MetaChip>{workshopHero.teamLine}</MetaChip>
              <MetaChip>{workshop.philosophy.join(" → ")}</MetaChip>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={workshopHero.primaryCta.href} className="w-full sm:w-auto">
                <Button size="lg" className="w-full min-h-11 sm:w-auto">
                  {workshopHero.primaryCta.label}
                </Button>
              </Link>
              <Link href={workshopHero.secondaryCta.href} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full min-h-11 sm:w-auto">
                  {workshopHero.secondaryCta.label}
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Robotics & Automation Club, TSEC organizes this workshop. Aurigen is not the organizer.
            </p>
          </motion.div>

          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-zinc-950 sm:aspect-video lg:aspect-[4/3]"
            {...(reduced ? {} : fadeUp)}
            transition={stagger(1)}
          >
            <Image
              src={workshopMedia.hero}
              alt="Yellow ESP32 walking robot with OLED face and four 3D-printed legs"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Field guide */}
      <Section id="field-guide" title="Open this during the workshop" eyebrow="Field guide">
        <div className="grid gap-4 sm:grid-cols-2">
          {fieldGuideLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md border border-white/10 bg-card p-5 transition-colors hover:border-accent/40"
            >
              <h3 className="font-heading text-lg font-semibold">{link.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{link.detail}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Overview */}
      <Section id="overview" title={workshopOverview.headline}>
        <div className="max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {workshopOverview.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      {/* Robot */}
      <Section id="robot" title="The Robot" eyebrow="Hardware">
        <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
          Four servos are driven directly by the ESP32-C3. No PCA9685. OLED is SH1106 on GPIO 8 and 9. Buzzer is GPIO 4. Keep power solid. Keep grounds common.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {robotSpecs.map((spec, i) => (
            <motion.div
              key={spec.title}
              className="rounded-md border border-white/10 bg-card p-5"
              {...(reduced ? {} : fadeUp)}
              transition={stagger(i, 0.05)}
            >
              <h3 className="font-heading text-lg font-semibold">{spec.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {spec.detail}
              </p>
            </motion.div>
          ))}
        </div>
        <ul className="mt-8 space-y-1 text-sm text-muted-foreground">
          {workshop.hardware.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </Section>

      {/* Journey */}
      <Section id="journey" title="Workshop Journey" eyebrow="Two days">
        <div className="grid gap-8 lg:grid-cols-2">
          <Timeline
            title={`Day 1 · ${workshop.dates.day1.label}`}
            subtitle={`${workshop.dates.day1.start} to ${workshop.dates.day1.end}`}
            steps={[...journeyDay1]}
          />
          <Timeline
            title={`Day 2 · ${workshop.dates.day2.label}`}
            subtitle={`${workshop.dates.day2.start} to ${workshop.dates.day2.end}`}
            steps={[...journeyDay2]}
          />
        </div>
      </Section>

      {/* What you build */}
      <Section id="build" title="What participants build">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10">
            <Image
              src={workshopMedia.robot1}
              alt="Close-up of a yellow ESP32 walking robot with OLED status screen and blue micro-servos"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              A take-home ESP32-C3 walking robot with OLED feedback and a path to BLE control.
            </p>
            <p>
              You leave with working firmware, calibrated neutrals, and a robot that moves because you made it move.
            </p>
          </div>
        </div>
      </Section>

      {/* Challenges */}
      <Section id="challenges" title="Today's missions" eyebrow="During the workshop">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {challengesPreview.map((c) => (
            <div
              key={c.title}
              className="rounded-md border border-white/10 bg-card/60 px-4 py-4"
            >
              <h3 className="font-heading text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          {postWorkshopNote.detail}{" "}
          <Link href={postWorkshopNote.href} className="text-accent hover:underline">
            {postWorkshopNote.title}
          </Link>
        </p>
      </Section>

      {/* Ecosystem links */}
      <Section id="ecosystem" title="Continue the project" eyebrow="Ecosystem">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystemLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md border border-white/10 bg-card p-5 transition-colors hover:border-accent/40"
            >
              <h3 className="font-heading text-lg font-semibold">{link.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{link.detail}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Showcase */}
      <Section id="showcase" title="Build showcase" eyebrow="Featured">
        {featured.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Featured robots will appear here after the workshop.
          </p>
        ) : (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              Sample profiles for layout. Real teams replace these after consent.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <BuilderCard key={p.botId} project={p} index={i} />
              ))}
            </div>
          </>
        )}
      </Section>

      {/* Soft Aurigen CTA */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
            Keep going
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {continueBuilding.headline}
          </h2>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            {continueBuilding.support}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {continueBuilding.tracks.map((t) => (
              <span
                key={t}
                className="rounded-sm border border-white/10 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Link href={continueBuilding.cta.href}>
              <Button size="lg">{continueBuilding.cta.label}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm border border-white/10 bg-white/5 px-2.5 py-1 text-xs sm:text-sm">
      {children}
    </span>
  );
}

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-border py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {eyebrow ? (
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mb-8 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function Timeline({
  title,
  subtitle,
  steps,
}: {
  title: string;
  subtitle: string;
  steps: readonly { time: string; title: string }[];
}) {
  return (
    <div className="rounded-md border border-white/10 bg-card p-5 md:p-6">
      <h3 className="font-heading text-xl font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <ol className="mt-6 space-y-3">
        {steps.map((step, i) => (
          <li key={step.title} className="flex items-center gap-3 text-sm">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-accent/30 font-mono text-[11px] text-accent">
              {i + 1}
            </span>
            <span className="min-w-[4.5rem] font-mono text-xs text-accent">
              {step.time}
            </span>
            <span>{step.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

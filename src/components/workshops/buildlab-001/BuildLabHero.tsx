"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BuildLabMediaPlaceholder } from "@/components/workshops/buildlab-001/BuildLabMediaPlaceholder";
import { BuildLabRegistrationForm } from "@/components/workshops/buildlab-001/BuildLabRegistrationForm";
import { buildLabHero, buildLabMedia, buildLabMeta } from "@/content/workshops/buildlab-001";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = videoRef.current;
    if (!el || failed || reducedMotion) return;
    el.play().catch(() => {
      /* autoplay may be blocked; still show muted controls-free frame */
    });
  }, [failed, reducedMotion]);

  if (failed || reducedMotion) {
    return (
      <BuildLabMediaPlaceholder
        kind="video"
        label="Robot walking demo"
        className="rounded-md"
        aspectClassName="aspect-[4/3] sm:aspect-video"
      />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-md border border-white/10 bg-zinc-950 aspect-[4/3] sm:aspect-video">
      {!ready ? (
        <div className="absolute inset-0 animate-pulse bg-muted/50" aria-hidden />
      ) : null}
      <video
        ref={videoRef}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-500",
          ready ? "opacity-100" : "opacity-0",
        )}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label="Muted looping video of the walking robot"
        onLoadedData={() => setReady(true)}
        onError={() => setFailed(true)}
      >
        <source src={buildLabMedia.heroVideoWebm} type="video/webm" />
        <source src={buildLabMedia.heroVideo} type="video/mp4" />
      </video>
    </div>
  );
}

export function BuildLabHero() {
  return (
    <section
      aria-labelledby="buildlab-hero-heading"
      className="relative overflow-hidden border-b border-border pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-36"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] grid-mesh"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <div className="min-w-0 lg:col-span-7">
            <motion.div {...fadeUp}>
              <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-accent">
                {buildLabMeta.name}
              </p>
              <h1
                id="buildlab-hero-heading"
                className="max-w-3xl text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]"
              >
                {buildLabHero.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
                {buildLabHero.support}
              </p>
              <p className="mt-4 font-heading text-sm font-semibold tracking-wide text-foreground/90 md:text-base">
                {buildLabMeta.tagline}
              </p>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={stagger(1, 0.06)}
              className="mt-6 flex flex-wrap gap-2"
            >
              {buildLabHero.badges.map((badge) => (
                <li
                  key={badge}
                  className="border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-foreground/85"
                >
                  {badge}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={stagger(2, 0.06)}
              className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            >
              <Link href={buildLabHero.primaryCta.href} className="w-full sm:w-auto">
                <Button size="lg" className="group h-12 w-full sm:w-auto">
                  <span className="text-nowrap">{buildLabHero.primaryCta.label}</span>
                  <ChevronRight className="ml-0.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link
                href={buildLabHero.secondaryCta.href}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full sm:w-auto"
                >
                  <Play className="size-4" aria-hidden />
                  <span className="text-nowrap">
                    {buildLabHero.secondaryCta.label}
                  </span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={stagger(3, 0.06)}
              className="relative mt-10"
            >
              <HeroVideo />
              <ul className="mt-4 flex flex-wrap gap-2 sm:absolute sm:bottom-4 sm:left-4 sm:right-4 sm:mt-0 sm:flex-nowrap sm:justify-start sm:gap-2">
                {buildLabHero.floatingChips.map((chip) => (
                  <li
                    key={chip}
                    className="border border-white/15 bg-[#0A0A0A]/85 px-2.5 py-1.5 text-[11px] font-medium text-foreground/90 backdrop-blur-md sm:shadow-lg"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(2, 0.08)}
            className="min-w-0 lg:sticky lg:top-28 lg:col-span-5"
          >
            <BuildLabRegistrationForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

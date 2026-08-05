"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { aboutHero } from "@/content/about";
import { easeOut } from "@/lib/motion";

export function AboutHero() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="About Aurigen"
      className="relative min-h-[100svh] overflow-hidden bg-[#0A0A0A]"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={aboutHero.image.src}
          alt={aboutHero.image.alt}
          fill
          priority
          className="object-cover opacity-70"
          style={
            aboutHero.image.objectPosition
              ? { objectPosition: aboutHero.image.objectPosition }
              : undefined
          }
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/92 via-[#0A0A0A]/65 to-[#0A0A0A]/35"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/50"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-12 lg:pb-28 lg:pt-32">
        <motion.div
          className="min-w-0 max-w-xl"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-white md:text-base">
            Aurigen
          </p>
          <h1 className="mt-4 text-balance text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-5 sm:text-5xl md:text-6xl">
            {aboutHero.headline}
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-zinc-300 sm:mt-6 sm:text-lg">
            {aboutHero.support}
          </p>
          {aboutHero.image.caption ? (
            <p className="mt-4 text-xs tracking-wide text-white/40">
              {aboutHero.image.caption}
            </p>
          ) : null}
          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center">
            <Link href={aboutHero.primaryCta.href} className="w-full sm:w-auto">
              <Button size="lg" className="group h-12 w-full pl-5 pr-3 text-base sm:w-auto">
                <span className="text-nowrap">{aboutHero.primaryCta.label}</span>
                <ChevronRight className="ml-1 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href={aboutHero.secondaryCta.href} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full px-5 text-base text-white border-white/20 hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <span className="text-nowrap">
                  {aboutHero.secondaryCta.label}
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

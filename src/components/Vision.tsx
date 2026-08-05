"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function Vision() {
  return (
    <section
      id="vision"
      className="py-24 md:py-36 bg-zinc-950 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="max-w-3xl">
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Future vision
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] mb-8 text-foreground">
            A generation that doesn&apos;t just adapt to AI — they invent with
            it.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
            We are building the operating system for how young people learn AI
            and robotics: physical labs, digital tooling, mentorship networks,
            and a culture that treats invention as a craft. That is venture-scale
            infrastructure for human potential.
          </p>
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <p className="text-sm font-heading font-medium tracking-wide text-foreground/80">
              The next founders start here.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function Vision() {
  return (
    <section
      id="vision"
      className="border-t border-white/10 bg-zinc-950 py-16 md:py-24 lg:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="max-w-3xl">
          <p className="mb-6 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Future
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-[1.12] text-foreground md:mb-8 md:text-5xl lg:text-[3.25rem]">
            A generation that invents with intelligent machines, not one that
            only adapts to them.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
            We are building how people forge AI and robotics capability:
            physical labs, digital tooling, mentorship networks, and a culture
            that treats invention as craft. That is institutional infrastructure
            for the next wave of engineers and founders.
          </p>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <p className="text-sm font-heading font-medium tracking-wide text-foreground/80">
              The next founders start here.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

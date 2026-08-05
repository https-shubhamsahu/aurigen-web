"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { buildLabIncluded } from "@/content/workshops/buildlab-001";
import { fadeUp, stagger } from "@/lib/motion";

export function BuildLabIncluded() {
  return (
    <section
      id="included"
      aria-labelledby="included-heading"
      className="scroll-mt-28 border-t border-border bg-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Kit & access
          </p>
          <h2
            id="included-heading"
            className="text-3xl font-bold leading-[1.1] md:text-5xl"
          >
            What&apos;s Included
          </h2>
        </motion.div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {buildLabIncluded.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i, 0.04)}
              className="flex items-start gap-3 border border-white/10 bg-background/40 px-5 py-5"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center border border-accent/30 bg-accent/10 text-accent">
                <Check className="size-3.5" aria-hidden />
              </span>
              <p className="text-sm font-medium leading-snug md:text-base">
                {item}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

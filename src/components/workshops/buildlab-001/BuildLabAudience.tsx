"use client";

import { motion } from "framer-motion";
import { buildLabAudience } from "@/content/workshops/buildlab-001";
import { fadeUp, stagger } from "@/lib/motion";

export function BuildLabAudience() {
  return (
    <section
      id="audience"
      aria-labelledby="audience-heading"
      className="scroll-mt-28 border-t border-border bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Audience
          </p>
          <h2
            id="audience-heading"
            className="text-3xl font-bold leading-[1.1] md:text-5xl"
          >
            Who Should Join
          </h2>
        </motion.div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {buildLabAudience.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i, 0.04)}
              className="border border-white/10 bg-card/30 px-5 py-6 text-center transition-colors hover:border-accent/35 hover:bg-card"
            >
              <p className="text-sm font-semibold tracking-tight md:text-base">
                {item}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

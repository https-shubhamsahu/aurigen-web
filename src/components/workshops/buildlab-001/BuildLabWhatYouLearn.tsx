"use client";

import { motion } from "framer-motion";
import { buildLabTopics } from "@/content/workshops/buildlab-001";
import { fadeUp, stagger } from "@/lib/motion";

export function BuildLabWhatYouLearn() {
  return (
    <section
      id="learn"
      aria-labelledby="learn-heading"
      className="scroll-mt-28 border-t border-border bg-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Skills
          </p>
          <h2
            id="learn-heading"
            className="text-3xl font-bold leading-[1.1] md:text-5xl"
          >
            What You&apos;ll Learn
          </h2>
        </motion.div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {buildLabTopics.map((topic, i) => (
            <motion.li
              key={topic}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i, 0.03)}
              className="border border-white/10 bg-background/40 px-5 py-5 transition-colors hover:border-white/20"
            >
              <span className="mb-3 block font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-base font-semibold tracking-tight">{topic}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

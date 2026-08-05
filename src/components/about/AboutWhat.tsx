"use client";

import { motion } from "framer-motion";
import { aboutWhat } from "@/content/about";
import { fadeUp } from "@/lib/motion";

/** Answer-first entity block for AEO. Lives on About only. */
export function AboutWhat() {
  return (
    <section
      id="what-is-aurigen"
      aria-labelledby="what-is-aurigen-heading"
      className="border-t border-border bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <h2
            id="what-is-aurigen-heading"
            className="mb-6 text-3xl font-bold leading-[1.1] md:text-5xl"
          >
            {aboutWhat.title}
          </h2>
          <p className="mb-6 text-xl font-heading font-semibold leading-snug tracking-tight text-foreground md:text-2xl md:leading-snug">
            {aboutWhat.answer}
          </p>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {aboutWhat.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

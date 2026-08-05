"use client";

import { motion } from "framer-motion";
import { aboutWhy } from "@/content/about";
import { fadeUp, stagger } from "@/lib/motion";

export function AboutWhy() {
  return (
    <section
      aria-labelledby="why-aurigen-heading"
      className="border-t border-border bg-background py-16 md:py-24 lg:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 md:mb-12 lg:mb-16">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {aboutWhy.eyebrow}
          </p>
          <h2
            id="why-aurigen-heading"
            className="max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            {aboutWhy.title}
          </h2>
        </motion.div>

        <div className="space-y-5 md:space-y-8">
          {aboutWhy.lines.map((line, i) => {
            const isLast = i === aboutWhy.lines.length - 1;
            return (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={stagger(i, 0.06)}
                className={
                  isLast
                    ? "max-w-4xl text-xl font-heading font-semibold leading-snug tracking-tight text-foreground sm:text-2xl md:text-4xl md:leading-[1.15]"
                    : "max-w-3xl text-2xl font-heading font-bold leading-[1.15] tracking-tight text-foreground sm:text-3xl md:text-5xl lg:text-[3.25rem]"
                }
              >
                {line}
              </motion.p>
            );
          })}
        </div>
      </div>
    </section>
  );
}

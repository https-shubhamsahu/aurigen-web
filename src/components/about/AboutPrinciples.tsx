"use client";

import { motion } from "framer-motion";
import { aboutPrinciples } from "@/content/about";
import { fadeUp, stagger } from "@/lib/motion";

export function AboutPrinciples() {
  return (
    <section className="border-t border-border bg-secondary py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-xl md:mb-14 lg:mb-20">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {aboutPrinciples.eyebrow}
          </p>
          <h2 className="text-3xl font-bold leading-[1.1] md:text-4xl">
            How we work.
          </h2>
        </motion.div>

        <ol className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
          {aboutPrinciples.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={stagger(i)}
              className="border-t border-white/10 pt-6"
            >
              <span className="mb-4 block font-mono text-xs font-medium text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { aboutNext } from "@/content/about";
import { fadeUp, stagger } from "@/lib/motion";

export function AboutNext() {
  return (
    <section className="border-t border-border bg-background py-16 md:py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14 lg:mb-20">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {aboutNext.eyebrow}
          </p>
          <h2 className="mb-5 text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-6xl">
            {aboutNext.title}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {aboutNext.support}
          </p>
        </motion.div>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {aboutNext.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i, 0.04)}
              className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-8 sm:py-6 md:py-7"
            >
              <span className="font-mono text-xs text-muted-foreground sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold sm:col-span-4 md:text-xl">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-7 md:text-[15px]">
                {item.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

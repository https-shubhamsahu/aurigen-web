"use client";

import { motion } from "framer-motion";
import { buildLabSteps } from "@/content/workshops/buildlab-001";
import { fadeUp, stagger } from "@/lib/motion";

export function BuildLabExperience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-28 border-t border-border bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Path
          </p>
          <h2
            id="experience-heading"
            className="text-3xl font-bold leading-[1.1] md:text-5xl"
          >
            Learning Experience
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-[17px]">
            A clear sequence from registration to a robot you take home.
          </p>
        </motion.div>

        <ol className="relative space-y-0 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-0 lg:grid-cols-4 lg:gap-x-6">
          {buildLabSteps.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i, 0.05)}
              className="relative flex gap-4 border-t border-white/10 py-6 md:border-t-0 md:py-0 md:pt-2"
            >
              <div className="flex shrink-0 flex-col items-center">
                <span className="flex size-9 items-center justify-center border border-accent/40 bg-accent/10 font-mono text-xs font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < buildLabSteps.length - 1 ? (
                  <span
                    className="mt-2 hidden w-px flex-1 bg-white/10 md:block lg:hidden"
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className="min-w-0 pb-2 md:pb-8">
                <p className="text-base font-semibold tracking-tight md:text-lg">
                  {step}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

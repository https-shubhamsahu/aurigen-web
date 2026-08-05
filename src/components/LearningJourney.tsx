"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const stages = [
  {
    phase: "Orient",
    title: "See how intelligent systems work",
    body: "Builders explore sensors, perception, and control. Intuition comes before complexity.",
  },
  {
    phase: "Build",
    title: "Ship working hardware and software",
    body: "Guided projects turn concepts into rovers, vision pipelines, and connected devices.",
  },
  {
    phase: "Review",
    title: "Debug, refine, and own the craft",
    body: "Failure is part of the loop. Mentors hold the standard while builders diagnose and redesign.",
  },
  {
    phase: "Lead",
    title: "Create original systems",
    body: "Advanced builders invent their own products and present them like founders.",
  },
];

export default function LearningJourney() {
  return (
    <section
      id="method"
      className="border-t border-border bg-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-12 max-w-2xl md:mb-16 lg:mb-20">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Method
          </p>
          <h2 className="mb-5 text-3xl font-bold leading-[1.1] md:text-5xl">
            How does Aurigen train builders?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Formation runs from first circuit to original invention. Progress is
            sequential and deliberate. Each stage deepens command of AI,
            robotics, and systems that ship.
          </p>
        </motion.div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stages.map((stage, i) => (
            <motion.li
              key={stage.phase}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={stagger(i)}
              className="relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-medium text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < stages.length - 1 && (
                  <span
                    className="hidden lg:block flex-1 h-px bg-border"
                    aria-hidden="true"
                  />
                )}
              </div>
              <p className="text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {stage.phase}
              </p>
              <h3 className="text-lg font-bold mb-2 leading-snug">
                {stage.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stage.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

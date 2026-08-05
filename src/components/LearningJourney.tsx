"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const stages = [
  {
    phase: "Discover",
    title: "See how intelligent systems work",
    body: "Students explore sensors, perception, and control — building intuition before complexity.",
  },
  {
    phase: "Build",
    title: "Ship working hardware + software",
    body: "Guided projects turn concepts into rovers, vision pipelines, and connected devices.",
  },
  {
    phase: "Iterate",
    title: "Debug, refine, and own the craft",
    body: "Failure is part of the loop. Learners diagnose, redesign, and improve under mentorship.",
  },
  {
    phase: "Lead",
    title: "Create original systems",
    body: "Advanced builders invent their own products — and present them like founders.",
  },
];

export default function LearningJourney() {
  return (
    <section
      id="journey"
      className="py-24 md:py-32 bg-secondary border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="max-w-2xl mb-16 md:mb-20">
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Learning journey
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] mb-5">
            A path from first circuit to original invention.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Progress is sequential and deliberate — each stage unlocks deeper
            agency with AI and robotics.
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

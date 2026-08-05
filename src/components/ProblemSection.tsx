"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const contrasts = [
  {
    before: "Syllabus coverage",
    after: "System understanding",
  },
  {
    before: "Passive consumption",
    after: "Active construction",
  },
  {
    before: "Grades as the goal",
    after: "Working prototypes as evidence",
  },
  {
    before: "Isolated subjects",
    after: "Integrated engineering",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="border-t border-border bg-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
          <motion.div {...fadeUp} className="lg:col-span-5">
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              Problem
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.15] mb-5">
              Most training prepares people for a world that no longer exists.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Students memorize definitions of neural networks and robotics
              without training a model or wiring a control loop. They leave
              fluent in theory and unprepared to build.
            </p>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col gap-0">
            {contrasts.map((row, i) => (
              <motion.div
                key={row.before}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={stagger(i, 0.06)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8 py-5 border-t border-border last:border-b"
              >
                <p className="text-sm text-muted-foreground line-through decoration-border">
                  {row.before}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {row.after}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

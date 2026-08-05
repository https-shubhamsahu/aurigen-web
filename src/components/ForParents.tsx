"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const reasons = [
  {
    title: "Visible progress",
    body: "Parents see working demos — not report cards filled with abstract scores.",
  },
  {
    title: "Future-ready skills",
    body: "AI literacy, systems thinking, and engineering discipline transfer far beyond any single career path.",
  },
  {
    title: "Safe, structured intensity",
    body: "High challenge with expert mentorship. Curiosity is protected; hustle culture is not the product.",
  },
  {
    title: "Confidence that compounds",
    body: "When a student ships something real, agency replaces anxiety. That shift lasts.",
  },
];

export default function ForParents() {
  return (
    <section
      id="parents"
      className="py-24 md:py-32 bg-background border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <motion.div {...fadeUp} className="lg:col-span-4">
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              For parents
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.15] mb-5">
              Confidence that your child is becoming a builder.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Aurigen is not another enrichment class. It is a serious
              environment where young people practice the craft of making
              intelligent machines.
            </p>
          </motion.div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={stagger(i)}
              >
                <div className="w-6 h-0.5 bg-accent mb-4" aria-hidden="true" />
                <h3 className="text-base font-bold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {r.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

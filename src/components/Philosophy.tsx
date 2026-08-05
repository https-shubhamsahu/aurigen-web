"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const principles = [
  {
    num: "01",
    title: "Build first",
    body: "Every concept lands inside a working system. Theory follows practice — never the reverse.",
  },
  {
    num: "02",
    title: "Hardware meets software",
    body: "Students move fluidly between code, circuits, sensors, and models. Real products require both.",
  },
  {
    num: "03",
    title: "Agency over instruction",
    body: "We coach problem-solving, not answer keys. Learners own the design decisions and the failures.",
  },
  {
    num: "04",
    title: "Proof over certificates",
    body: "Progress is measured by what you ship: demos, repositories, and systems that work in the physical world.",
  },
];

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="py-24 md:py-32 bg-background border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="max-w-2xl mb-16 md:mb-20">
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Learning philosophy
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] mb-5">
            How we teach is how engineers actually work.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Not a tuition class. Not a coaching institute. A disciplined
            practice of making things that think and move.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
          {principles.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={stagger(i)}
              className="flex gap-5"
            >
              <span className="font-mono text-xs text-accent font-medium pt-1.5 shrink-0">
                {p.num}
              </span>
              <div>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

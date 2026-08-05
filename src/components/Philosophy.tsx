"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const principles = [
  {
    num: "01",
    title: "Build first",
    body: "Every concept lands inside a working system. Theory follows practice. Never the reverse.",
  },
  {
    num: "02",
    title: "Hardware meets software",
    body: "Builders move between code, circuits, sensors, and models. Real machines require both.",
  },
  {
    num: "03",
    title: "Constraint and review",
    body: "We coach problem-solving under real limits. Learners own the design decisions and the failures.",
  },
  {
    num: "04",
    title: "Evidence over certificates",
    body: "Progress is measured by what you ship: demos, repositories, and systems that work in the physical world.",
  },
];

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="border-t border-border bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-12 max-w-2xl md:mb-16 lg:mb-20">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Standards
          </p>
          <h2 className="mb-5 text-3xl font-bold leading-[1.1] md:text-5xl">
            How we forge is how engineers actually work.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Not a tuition class. Not a coaching institute. A disciplined craft
            of making machines that sense, decide, and move.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 sm:gap-y-12">
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

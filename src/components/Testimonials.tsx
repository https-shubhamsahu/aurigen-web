"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const testimonials = [
  {
    quote:
      "I trained a model and wired the control loop myself. The rover detects obstacles and navigates. That is the evidence I care about.",
    name: "Liam K.",
    role: "Student · Age 14",
    audience: "Student",
  },
  {
    quote:
      "Her confidence shifted when the demos started working. She designs vision systems now. Screens are tools, not the product.",
    name: "Priya R.",
    role: "Parent of Sophia · Age 11",
    audience: "Parent",
  },
  {
    quote:
      "Our CS track stopped being syntax drills. Students invent, wire, and present systems in a real AI lab.",
    name: "Dr. Sandeep Singh",
    role: "Principal · Lotus Valley School",
    audience: "School",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-border bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-16">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Proof
          </p>
          <h2 className="text-3xl font-bold leading-[1.1] md:text-5xl">
            What builders say after they ship something real.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i)}
              className={
                i === 0
                  ? "lg:col-span-6 flex flex-col justify-between border-t border-border pt-8"
                  : "lg:col-span-3 flex flex-col justify-between border-t border-border pt-8"
              }
            >
              <p
                className={
                  i === 0
                    ? "text-lg md:text-xl leading-relaxed text-foreground mb-8"
                    : "text-[15px] leading-relaxed text-foreground mb-8"
                }
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer>
                <p className="text-sm font-heading font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

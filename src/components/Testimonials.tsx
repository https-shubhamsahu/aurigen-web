"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const testimonials = [
  {
    quote:
      "Aurigen didn't just teach me Python. I built an autonomous rover with obstacle detection. I feel like an engineer.",
    name: "Liam K.",
    role: "Student · Age 14",
    audience: "Student",
  },
  {
    quote:
      "The shift in my daughter's confidence is unmistakable. She's designing vision systems instead of only consuming screens.",
    name: "Priya R.",
    role: "Parent of Sophia · Age 11",
    audience: "Parent",
  },
  {
    quote:
      "Our CS program stopped being about memorizing syntax. Students invent and wire systems in a real AI laboratory.",
    name: "Dr. Sandeep Singh",
    role: "Principal · Lotus Valley School",
    audience: "School",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 bg-background border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="max-w-2xl mb-16">
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Voices
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.1]">
            What builders say after they ship something real.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
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

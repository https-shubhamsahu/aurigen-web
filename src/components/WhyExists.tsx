"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const pillars = [
  {
    title: "From consumers to creators",
    body: "Technology is reshaping every industry. The next generation should not only use it — they should invent with it.",
  },
  {
    title: "Engineering over memorization",
    body: "We replace rote learning with real systems: sensors, models, motors, and the reasoning that binds them.",
  },
  {
    title: "Venture-scale ambition",
    body: "Aurigen is building infrastructure for how young people learn AI and robotics — not another coaching franchise.",
  },
];

export default function WhyExists() {
  return (
    <section id="why" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="max-w-2xl mb-16 md:mb-20">
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Why Aurigen exists
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] mb-5">
            The world needs builders — not better test-takers.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Aurigen is an AI and Robotics company. We exist to grow the people
            who will design, ship, and lead the systems of tomorrow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={stagger(i)}
              className={
                i === 0 ? "lg:col-span-5" : i === 1 ? "lg:col-span-3" : "lg:col-span-4"
              }
            >
              <div className="w-8 h-px bg-accent mb-6" aria-hidden="true" />
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

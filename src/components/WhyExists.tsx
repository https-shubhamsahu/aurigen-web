"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const pillars = [
  {
    title: "From consumers to builders",
    body: "Machines that sense, decide, and act are rewriting every industry. Young people should design those systems, not only use them.",
  },
  {
    title: "Engineering over memorization",
    body: "We replace rote coverage with real systems: sensors, models, motors, and the control that binds them.",
  },
  {
    title: "Institutional ambition",
    body: "Aurigen builds the labs, standards, and mentorship that forge AI engineers and robotics innovators. Not another coaching franchise.",
  },
];

export default function WhyExists() {
  return (
    <section id="why" className="border-t border-border bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-12 max-w-2xl md:mb-16 lg:mb-20">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Reality
          </p>
          <h2 className="mb-5 text-3xl font-bold leading-[1.1] md:text-5xl">
            Why does Aurigen exist?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            The world needs builders, not better test-takers. Aurigen is an
            engineering institution. We forge the people who design, ship, and
            lead intelligent machines in AI and robotics.
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

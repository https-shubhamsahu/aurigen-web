"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const pillars = [
  {
    title: "Builder sprints",
    body: "Time-boxed challenges under real constraints. Collaborate, then ship demos.",
  },
  {
    title: "Peer review",
    body: "Young engineers share schematics, critique code, and raise each other's bar.",
  },
  {
    title: "Showcases",
    body: "Quarterly presentations to parents, educators, and mentors. Evidence first. Story second.",
  },
];

export default function CommunitySection() {
  return (
    <section
      id="community"
      className="border-t border-border bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-16">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Cohort
          </p>
          <h2 className="mb-5 text-3xl font-bold leading-[1.1] md:text-5xl">
            Builders grow faster under shared standards.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Aurigen connects students who share a craft: making intelligent
            systems, reviewing work, and shipping under constraint.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 border-t border-border pt-10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i)}
              className={
                i === 0 ? "lg:col-span-5" : i === 1 ? "lg:col-span-3" : "lg:col-span-4"
              }
            >
              <h3 className="text-lg font-bold mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

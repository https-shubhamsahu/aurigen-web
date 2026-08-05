"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const pillars = [
  {
    title: "Builder sprints",
    body: "Time-boxed challenges where students collaborate under real constraints — then ship demos.",
  },
  {
    title: "Peer network",
    body: "A community of young engineers who share schematics, critique code, and raise each other's bar.",
  },
  {
    title: "Showcases",
    body: "Quarterly presentations to parents, educators, and mentors — practice telling the story of what you built.",
  },
];

export default function CommunitySection() {
  return (
    <section
      id="community"
      className="py-24 md:py-32 bg-background border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="max-w-2xl mb-16">
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Community
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] mb-5">
            Builders grow faster together.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Innovation is a social practice. Aurigen connects students who share
            an obsession with making intelligent systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i)}
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

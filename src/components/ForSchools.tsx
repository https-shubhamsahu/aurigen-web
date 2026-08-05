"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const benefits = [
  {
    title: "Turnkey lab infrastructure",
    body: "Curriculum, hardware kits, and teacher enablement — designed as a coherent system, not a toolkit dump.",
  },
  {
    title: "Curriculum that inspires trust",
    body: "Standards-aware pathways that still feel like real engineering. Students leave with portfolios, not worksheets.",
  },
  {
    title: "A partner, not a vendor",
    body: "We work with schools as a long-term platform for AI and robotics capability — measured by student outcomes.",
  },
];

export default function ForSchools() {
  return (
    <section
      id="schools"
      className="py-24 md:py-32 bg-secondary border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="max-w-2xl mb-14">
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
            For schools
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] mb-5">
            Bring world-class AI & robotics into your institution.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Partner with Aurigen to deploy labs, license curriculum, and train
            educators who can mentor builders — not just deliver slides.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i)}
              className="bg-background border border-white/10 rounded-lg p-7"
            >
              <h3 className="text-base font-bold mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp}>
          <Link href="#contact">
            <Button size="lg" className="group">
              Partner with Aurigen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

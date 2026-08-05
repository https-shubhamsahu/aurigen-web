"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const benefits = [
  {
    title: "Lab infrastructure",
    body: "Hardware kits, standards, and mentor enablement designed as one coherent system.",
  },
  {
    title: "Standards with portfolios",
    body: "Pathways that feel like real engineering. Students leave with demos and repositories, not worksheets.",
  },
  {
    title: "A partner on the lab",
    body: "We work with schools as a long-term platform for AI and robotics capability, measured by what students ship.",
  },
];

export default function ForSchools() {
  return (
    <section
      id="schools"
      className="border-t border-border bg-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Labs
          </p>
          <h2 className="mb-5 text-3xl font-bold leading-[1.1] md:text-5xl">
            Bring serious AI and robotics into your institution.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Partner with Aurigen to deploy labs, adopt standards, and train
            mentors who forge builders, not slide decks.
          </p>
        </motion.div>

        <div className="mb-10 grid grid-cols-1 gap-8 md:mb-12 md:grid-cols-3 md:gap-12">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i)}
              className="border-l-2 border-accent/70 pl-5"
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
            <Button size="lg" className="group h-12 w-full sm:w-auto">
              Partner on a lab
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

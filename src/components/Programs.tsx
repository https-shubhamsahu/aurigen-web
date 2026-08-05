"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const programs = [
  {
    title: "AI Foundations",
    focus: "Perception and models",
    body: "Train and deploy vision models. Learn what neural nets see, then put them to work on real inputs.",
  },
  {
    title: "Robotics Systems",
    focus: "Motion and control",
    body: "Design kinematics, sensor fusion, and autonomous behaviors on physical platforms that move through space.",
  },
  {
    title: "Embedded Intelligence",
    focus: "Hardware and firmware",
    body: "Wire microcontrollers, read sensors, and write firmware that bridges digital logic and physical machines.",
  },
  {
    title: "Founder Track",
    focus: "Product and leadership",
    body: "Take an original idea from sketch to demo. Mentorship covers scope, evidence, and shipping.",
  },
];

export default function Programs() {
  return (
    <section
      id="programs"
      className="border-t border-border bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          {...fadeUp}
          className="mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              Tracks
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-[1.1]">
              Formation paths for makers, not memorization.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed md:text-right">
            Each track combines standards, hardware, and mentors. Everything
            orients around what builders ship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border overflow-hidden">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i, 0.05)}
              className="group bg-card p-6 transition-colors hover:bg-muted/60 sm:p-8 md:p-10"
            >
              <p className="text-xs font-mono text-muted-foreground mb-3">
                {program.focus}
              </p>
              <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                {program.title}
                <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-opacity text-muted-foreground" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {program.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="#contact"
            className="inline-flex min-h-11 items-center text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            Apply to build
          </Link>
        </div>
      </div>
    </section>
  );
}

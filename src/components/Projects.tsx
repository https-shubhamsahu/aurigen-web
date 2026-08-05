"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const projects = [
  {
    title: "Vision-triggered security lock",
    student: "Liam K. · 14",
    domain: "Computer Vision",
    body: "Edge inference matching camera frames to a local embedding set, driving a physical relay latch.",
  },
  {
    title: "Autonomous maze rover",
    student: "Rohan M. · 16",
    domain: "Robotics",
    body: "Sonar telemetry and coordinate mapping for real-time collision boundaries on a micro-Python stack.",
  },
  {
    title: "Smart hydration monitor",
    student: "Sophia R. · 11",
    domain: "Embedded",
    body: "Capacitive soil sensing with ADC conversion. Alerts pulse when moisture thresholds drop.",
  },
  {
    title: "Distributed greenhouse net",
    student: "Chloe T. · 17",
    domain: "IoT Systems",
    body: "Temperature, humidity, and valve nodes streaming over sockets into a live telemetry dashboard.",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-border bg-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-16">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Work
          </p>
          <h2 className="mb-5 text-3xl font-bold leading-[1.1] md:text-5xl">
            What they build is the evidence.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Real systems: wired, programmed, and demonstrated. Portfolio over
            praise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 border-t border-border">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={stagger(i)}
              className="border-b border-border py-8 text-left"
            >
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-accent">
                  {project.domain}
                </span>
                <span className="text-xs text-muted-foreground">
                  {project.student}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

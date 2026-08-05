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
    body: "Capacitive soil sensing with ADC conversion — pulsing alerts when moisture thresholds drop.",
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
      className="py-24 md:py-32 bg-secondary border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp} className="max-w-2xl mb-16">
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Student projects
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] mb-5">
            What they build is the proof.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Real systems — wired, programmed, and demonstrated by Aurigen
            students.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={stagger(i)}
              className="bg-background border border-white/10 rounded-lg p-8 text-left"
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-muted-foreground">
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

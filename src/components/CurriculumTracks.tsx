"use client";

import { Package } from "lucide-react";
import { motion } from "framer-motion";

interface TrackItem {
  level: string;
  title: string;
  desc: string;
  project: string;
}

export default function CurriculumTracks() {
  const tracks: TrackItem[] = [
    {
      level: "Level 1",
      title: "Visual Block Logic & Simple Sensors",
      desc: "Understand algorithms, loops, and conditions. Build projects using light sensors, buzzers, and programmable LED arrays.",
      project: "Smart Plant Hydration Indicator",
    },
    {
      level: "Level 2",
      title: "Applied Robotics & Embedded Python",
      desc: "Transition from visual blocks to text-based micro-Python. Control motorized rovers, sonar sensors, and Bluetooth communication.",
      project: "Maze-Solving Autonomous Rover",
    },
    {
      level: "Level 3",
      title: "Computer Vision & AI Inference",
      desc: "Train and run custom AI models. Write scripts to classify video streams, detect gestures, and trigger physical actuators.",
      project: "Facial-Recognition Security Lock",
    },
    {
      level: "Level 4",
      title: "IoT Networks & Distributed Systems",
      desc: "Connect multiple nodes together. Orchestrate cloud telemetry dashboards, sensor data storage, and remote actuators.",
      project: "Distributed Smart GreenHouse Network",
    },
  ];

  return (
    <section className="py-24 border-t border-border" id="curriculum">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider block mb-3 font-heading">
            Learning Pathways
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            From first circuit to original invention
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Our project-based curriculum is divided into progressive tracks.
            Students move from basic logic structures to production-level systems
            engineering.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto pl-8 md:pl-10 before:content-[''] before:absolute before:top-0 before:left-2 before:w-[2px] before:h-full before:bg-border">
          {tracks.map((track, index) => (
            <motion.div
              key={track.level}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative mb-12 last:mb-0 group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[38px] md:-left-[40px] top-6 w-4.5 h-4.5 rounded-full bg-background border-[3px] border-border group-hover:border-primary group-hover:shadow-[0_0_10px_var(--accent-yellow-glow)] transition-all duration-300 z-10" />

              {/* Card content */}
              <div className="bg-card border border-border rounded-xl p-8 ml-3 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,214,0,0.02)]">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="font-heading text-[11px] font-bold bg-primary/8 border border-primary/20 text-primary px-2.5 py-1 rounded-sm uppercase tracking-wider">
                    {track.level}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-foreground">
                    {track.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-[15px] leading-relaxed mb-5">
                  {track.desc}
                </p>
                <div className="inline-flex items-center gap-2 bg-white/3 border border-border px-4 py-2 rounded-sm">
                  <span className="text-[12px] font-semibold text-muted-foreground flex items-center gap-1.5">
                    <Package className="h-3.5 w-3.5 text-primary" />
                    <span>Featured Build:</span>
                  </span>
                  <span className="font-heading text-xs font-bold text-primary">
                    {track.project}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Check, Trophy, LineChart, School, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type PersonaKey = "student" | "parent" | "school" | "teacher";

interface PersonaData {
  title: string;
  lead: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
  rightCard: React.ReactNode;
}

export default function PersonaHub() {
  const [activePersona, setActivePersona] = useState<PersonaKey>("student");

  const personas: Record<PersonaKey, PersonaData> = {
    student: {
      title: "Build as an inventor",
      lead: "Skip the textbooks. Work with real hardware, raw code, and computer vision model templates.",
      bullets: [
        "Build projects like face-tracking turrets and smart plants.",
        "Bridge visual node logic with Python syntax dynamically.",
        "Publish your creations to a global project hub for recognition.",
      ],
      ctaText: "Test the Sandbox",
      ctaHref: "#sandbox",
      rightCard: (
        <div className="bg-zinc-900/60 border border-border rounded-lg p-6 w-full max-w-[380px] shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-muted-foreground mb-4 uppercase font-heading">
            <Trophy className="h-4.5 w-4.5 text-primary" />
            <span>Student Achievement</span>
          </div>
          <p className="text-sm font-medium mb-5">
            Build an AI Autonomous obstacle-avoiding vehicle in 6 project milestones.
          </p>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-primary rounded-full w-[75%]" />
          </div>
          <span className="font-mono text-xs text-primary">Milestone 4 of 6</span>
        </div>
      ),
    },
    parent: {
      title: "Give your child engineering skill",
      lead: "Don't only let them consume technology. Let them master the core engineering logic behind it.",
      bullets: [
        "Curriculum created by top Robotics and Machine Learning engineers.",
        "Focus on critical, high-agency troubleshooting and logical flow.",
        "Real hardware kits mailed directly to your door, integrated with our IDE.",
      ],
      ctaText: "Schedule a Trial Session",
      ctaHref: "#contact",
      rightCard: (
        <div className="bg-zinc-900/60 border border-border rounded-lg p-6 w-full max-w-[380px] shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-muted-foreground mb-4 uppercase font-heading">
            <LineChart className="h-4.5 w-4.5 text-primary" />
            <span>Parent Dashboard</span>
          </div>
          <p className="text-sm font-medium mb-5">
            Analytics: Spatial Intelligence, Algorithmic Syntax, and Hardware Troubleshooting metrics.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/20 border border-border rounded p-3 text-center">
              <div className="font-heading text-2xl font-bold text-foreground">92%</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Troubleshooting</div>
            </div>
            <div className="bg-black/20 border border-border rounded p-3 text-center">
              <div className="font-heading text-2xl font-bold text-foreground">88%</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">AI Model Logic</div>
            </div>
          </div>
        </div>
      ),
    },
    school: {
      title: "Stand up an AI and robotics lab",
      lead: "Deploy professional curriculum, physical hardware, and digital IDEs under your institution's name.",
      bullets: [
        "Turnkey laboratory design: from workstations to custom microcontrollers.",
        "Full curriculum alignment for middle and high-school levels.",
        "Teacher training, ongoing support, and regional innovation expos.",
      ],
      ctaText: "Contact Institutional Team",
      ctaHref: "#contact",
      rightCard: (
        <div className="bg-zinc-900/60 border border-border rounded-lg p-6 w-full max-w-[380px] shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-muted-foreground mb-4 uppercase font-heading">
            <School className="h-4.5 w-4.5 text-primary" />
            <span>Aurigen Labs B2B Package</span>
          </div>
          <p className="text-sm font-medium mb-5">
            Turnkey implementation includes curriculum guides, sensor arrays, rovers, and customized local servers.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] bg-white/5 border border-border px-2.5 py-1 rounded-full">
              200+ Lesson Plans
            </span>
            <span className="text-[11px] bg-white/5 border border-border px-2.5 py-1 rounded-full">
              Hardware Kits
            </span>
            <span className="text-[11px] bg-white/5 border border-border px-2.5 py-1 rounded-full">
              Admin Dashboard
            </span>
          </div>
        </div>
      ),
    },
    teacher: {
      title: "Teach tech without the friction",
      lead: "You don't need to be an AI researcher or coding veteran to guide your class. Our system handles the heavy lifting.",
      bullets: [
        "One-click classroom dashboard: see every student's code in real-time.",
        "Instant debugger highlights common connection and compilation errors.",
        "Interactive simulators allow students to test before pushing code to boards.",
      ],
      ctaText: "Request Teacher Access",
      ctaHref: "#contact",
      rightCard: (
        <div className="bg-zinc-900/60 border border-border rounded-lg p-6 w-full max-w-[380px] shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-muted-foreground mb-4 uppercase font-heading">
            <Users className="h-4.5 w-4.5 text-primary" />
            <span>Teacher Portal</span>
          </div>
          <p className="text-sm font-medium mb-4">
            Classroom monitor: 24 active workspaces. 3 students requesting validation assistance.
          </p>
          <div className="bg-black/35 border border-red-500/20 px-3.5 py-2.5 rounded text-[11px] font-mono text-red-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>Student Liam: Hardware connection fault (Pin 13)</span>
          </div>
        </div>
      ),
    },
  };

  const activeData = personas[activePersona];

  return (
    <section className="py-24 bg-[#0b0b0c] border-t border-border" id="personas">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider block mb-3 font-heading">
            Designed For Builders & Sponsors
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Paths built for every builder
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Student, parent, or school leader: Aurigen has a clear path into
            hands-on AI and robotics.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {(Object.keys(personas) as PersonaKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActivePersona(key)}
              className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all font-heading cursor-pointer ${
                activePersona === key
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-transparent text-muted-foreground border-border hover:border-muted-foreground"
              }`}
            >
              {key === "student"
                ? "Students (11+)"
                : key.charAt(0).toUpperCase() + key.slice(1) + (key === "school" ? "s & Colleges" : "s")}
            </button>
          ))}
        </div>

        {/* Content Pane */}
        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left text info */}
              <div className="flex flex-col items-start">
                <div className="w-10 h-1 bg-primary rounded-full mb-6" />
                <h3 className="text-3xl font-bold mb-4 font-heading text-foreground">
                  {activeData.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {activeData.lead}
                </p>
                <ul className="flex flex-col gap-4 mb-10 text-left">
                  {activeData.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <a href={activeData.ctaHref}>
                  <Button variant="outline" className="h-11 px-6 rounded-md font-heading text-sm font-semibold border-border hover:bg-white/5">
                    {activeData.ctaText}
                  </Button>
                </a>
              </div>

              {/* Right graphical preview */}
              <div className="w-full h-80 bg-gradient-to-br from-primary/3 to-white/1 border border-border rounded-xl flex items-center justify-center p-6 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,214,0,0.02)_0%,transparent_60%)] -z-10 pointer-events-none" />
                {activeData.rightCard}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

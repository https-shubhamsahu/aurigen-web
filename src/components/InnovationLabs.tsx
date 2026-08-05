"use client";

import { Wrench, Monitor, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function InnovationLabs() {
  const specs = [
    {
      icon: <Wrench className="h-5 w-5" />,
      title: "Custom Workstation Setup",
      desc: "Standard electrical protection, electrostatic pads, and dedicated assembly drawers customized for physical robotics and IoT builds.",
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      title: "Integrated Telemetry Nodes",
      desc: "Local servers host student IDE sandboxes, streaming active signals, compiler readouts, and webcam streams directly to classroom panels.",
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "Component Sourcing Blueprint",
      desc: "Comprehensive procurement and delivery support for autonomous rovers, sensor modules, actuator shields, and microprocessors.",
    },
  ];

  return (
    <section className="py-24 border-t border-border" id="labs">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Detail column */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider block mb-3 font-heading">
            Innovation Laboratories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading leading-tight">
            Turnkey STEM Deployments
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-10">
            We transform standard school rooms into professional innovation hubs. We engineer everything from structural workplace safety designs to local server hosting infrastructures.
          </p>

          <div className="flex flex-col gap-8 w-full">
            {specs.map((spec) => (
              <div key={spec.title} className="flex gap-5">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-border flex items-center justify-center text-primary flex-shrink-0">
                  {spec.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold font-heading mb-1 text-foreground">
                    {spec.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Visual graphic outline box */}
        <div className="lg:col-span-6 w-full h-[360px] bg-gradient-to-br from-primary/3 to-white/1 border border-border rounded-xl flex items-center justify-center p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,214,0,0.02)_0%,transparent_60%)] pointer-events-none" />

          {/* Graphical hardware list mock card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-900/60 border border-border rounded-lg p-6 w-full max-w-[420px] shadow-xl backdrop-blur-md"
          >
            <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mb-4 uppercase font-heading">
              <span>Hardware Bill of Materials</span>
              <span className="text-primary font-mono">LAB-PKG-04</span>
            </div>
            <ul className="flex flex-col gap-3 font-mono text-xs text-neutral-300 text-left">
              <li className="flex justify-between border-b border-border/40 pb-2">
                <span>[01] Smart Rover Chassis Kit</span>
                <span className="text-primary">x24 Units</span>
              </li>
              <li className="flex justify-between border-b border-border/40 pb-2">
                <span>[02] Sonar Sensors (Trigger/Echo)</span>
                <span className="text-primary">x48 Units</span>
              </li>
              <li className="flex justify-between border-b border-border/40 pb-2">
                <span>[03] Micro-Processor Node v2</span>
                <span className="text-primary">x24 Units</span>
              </li>
              <li className="flex justify-between pb-1">
                <span>[04] Breadboard Sensor Wire Looms</span>
                <span className="text-primary">x120 Units</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

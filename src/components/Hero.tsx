"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

export default function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex items-end md:items-center overflow-hidden"
      aria-label="Aurigen — Build the Future with AI & Robotics"
    >
      {/* Full-bleed visual plane */}
      <div className="absolute inset-0 bg-zinc-950" aria-hidden="true">
        <div className="absolute inset-0 grid-mesh opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,193,7,0.06) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(255,255,255,0.02) 0%, transparent 50%)",
          }}
        />
        {/* Soft geometric anchor — engineering, not illustration */}
        <div className="absolute right-[-8%] top-[18%] hidden lg:block w-[52%] aspect-square pointer-events-none">
          <div className="absolute inset-[12%] rounded-full border border-white/[0.06]" />
          <div className="absolute inset-[24%] rounded-full border border-white/[0.08]" />
          <div className="absolute inset-[36%] rounded-full border border-white/[0.1]" />
          <div className="absolute inset-[48%] rounded-full bg-accent/15" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" />
          <div className="absolute left-[18%] top-[42%] w-[28%] h-px bg-white/[0.12]" />
          <div className="absolute left-[54%] top-[42%] w-[28%] h-px bg-white/[0.12]" />
          <div className="absolute left-[50%] top-[18%] w-px h-[28%] bg-white/[0.12]" />
          <div className="absolute left-[50%] top-[54%] w-px h-[28%] bg-white/[0.12]" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="font-heading text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-foreground mb-6"
          >
            Aurigen
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
            className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Build the Future with{" "}
            <span className="relative inline-block">
              AI &amp; Robotics
              <span
                className="absolute bottom-1 left-0 right-0 h-2 md:h-2.5 bg-accent/50 -z-10 rounded-sm"
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: easeOut }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg mb-10"
          >
            We build innovators, engineers, creators, and founders through
            hands-on AI and robotics — not lectures, not coaching.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: easeOut }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link href="#contact">
              <Button size="lg" className="w-full sm:w-auto group">
                Start Building
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="#why">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Why Aurigen
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

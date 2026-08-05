"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BottomCTA() {
  return (
    <section className="py-20 relative overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(255,214,0,0.02)_0%,transparent_60%)] border-t border-border">
      <div className="absolute inset-0 grid-mesh [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-mono uppercase tracking-wider mb-6">
          <Terminal className="h-3 w-3" />
          <span>System active. Ready to deploy.</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-heading">
          Ready to transition from consumer to creator?
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Launch our web sandbox now to compile scripts, or connect with our team to configure a lab package for your school.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="#sandbox" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-11 px-6 rounded-md font-heading text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/95 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,214,0,0.1)]">
              <span>Launch Web Sandbox</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#contact" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-11 px-6 rounded-md text-sm font-semibold border-border hover:bg-white/5 cursor-pointer">
              Contact Lab Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

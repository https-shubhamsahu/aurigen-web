"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { aboutFinalCta } from "@/content/about";
import { fadeUp } from "@/lib/motion";

export function AboutFinalCta() {
  return (
    <section className="border-t border-border bg-zinc-950 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <h2 className="mb-8 text-3xl font-bold leading-[1.15] md:mb-10 md:text-4xl lg:text-[2.75rem]">
            {aboutFinalCta.headline}
          </h2>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link href={aboutFinalCta.primary.href} className="w-full sm:w-auto">
              <Button size="lg" className="group h-12 w-full pl-5 pr-3 text-base sm:w-auto">
                <span className="text-nowrap">{aboutFinalCta.primary.label}</span>
                <ChevronRight className="ml-1 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href={aboutFinalCta.secondary.href} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full px-5 text-base sm:w-auto"
              >
                <span className="text-nowrap">
                  {aboutFinalCta.secondary.label}
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

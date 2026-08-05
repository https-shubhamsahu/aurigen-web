"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { buildLabFinalCta } from "@/content/workshops/buildlab-001";
import { fadeUp } from "@/lib/motion";

export function BuildLabFinalCta() {
  return (
    <section className="border-t border-border bg-zinc-950 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="mb-5 text-3xl font-bold leading-[1.15] md:mb-6 md:text-4xl lg:text-[2.75rem]">
            {buildLabFinalCta.headline}
          </h2>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground md:mb-10 md:text-[17px]">
            {buildLabFinalCta.support}
          </p>
          <Link href={buildLabFinalCta.primary.href} className="inline-flex">
            <Button size="lg" className="group h-12 px-7 text-base">
              <span className="text-nowrap">{buildLabFinalCta.primary.label}</span>
              <ChevronRight className="ml-1 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

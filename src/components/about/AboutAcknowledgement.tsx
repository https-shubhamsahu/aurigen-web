"use client";

import { motion } from "framer-motion";
import { PhotoFrame } from "@/components/about/PhotoFrame";
import { aboutAcknowledgement } from "@/content/about";
import { fadeUp } from "@/lib/motion";

export function AboutAcknowledgement() {
  return (
    <section className="border-t border-border bg-secondary py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-xl md:mb-14 lg:mb-20">
          <h2 className="text-3xl font-bold leading-[1.1] md:text-4xl">
            {aboutAcknowledgement.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-12 lg:gap-20">
          <motion.div {...fadeUp} className="min-w-0 lg:col-span-5">
            <PhotoFrame
              image={aboutAcknowledgement.portrait}
              className="mx-auto max-w-sm sm:mx-0 sm:max-w-md"
            />
          </motion.div>

          <motion.div {...fadeUp} className="min-w-0 lg:col-span-7">
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
              {aboutAcknowledgement.name}
            </h3>
            <div className="mt-3 space-y-1">
              {aboutAcknowledgement.roles.map((role) => (
                <p
                  key={role}
                  className="text-sm font-medium leading-snug text-accent"
                >
                  {role}
                </p>
              ))}
            </div>

            <div className="mt-10 max-w-xl space-y-5 border-t border-white/10 pt-8">
              {aboutAcknowledgement.body.map((p) => (
                <p
                  key={p}
                  className="text-base leading-relaxed text-muted-foreground md:text-[17px]"
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

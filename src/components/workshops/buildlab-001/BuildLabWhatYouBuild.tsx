"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BuildLabMediaPlaceholder } from "@/components/workshops/buildlab-001/BuildLabMediaPlaceholder";
import { buildLabFeatures, buildLabMedia } from "@/content/workshops/buildlab-001";
import { fadeUp, stagger } from "@/lib/motion";

export function BuildLabWhatYouBuild() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      id="build"
      aria-labelledby="build-heading"
      className="scroll-mt-28 border-t border-border bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Workshop overview
          </p>
          <h2
            id="build-heading"
            className="text-3xl font-bold leading-[1.1] md:text-5xl"
          >
            What You&apos;ll Build
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={stagger(0)}
            className="min-w-0 lg:col-span-6"
          >
            {imgFailed ? (
              <BuildLabMediaPlaceholder
                label="Finished walking robot"
                aspectClassName="aspect-[4/5] sm:aspect-[5/4]"
              />
            ) : (
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-zinc-950 sm:aspect-[5/4]">
                <Image
                  src={buildLabMedia.showcaseImage}
                  alt="Finished ESP32 walking robot from BuildLab #001"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                  onError={() => setImgFailed(true)}
                />
              </div>
            )}
          </motion.div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6">
            {buildLabFeatures.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={stagger(i, 0.04)}
                className="border border-white/10 bg-card/40 px-4 py-4 text-sm font-medium text-foreground/90 transition-colors hover:border-accent/40 hover:bg-card"
              >
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

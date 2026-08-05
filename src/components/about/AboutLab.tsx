"use client";

import { motion } from "framer-motion";
import { PhotoFrame } from "@/components/about/PhotoFrame";
import { VerticalImageStack } from "@/components/ui/vertical-image-stack";
import { aboutLab } from "@/content/about";
import { fadeUp, stagger } from "@/lib/motion";

export function AboutLab() {
  return (
    <section className="border-t border-border bg-secondary py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14 lg:mb-20">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {aboutLab.eyebrow}
          </p>
          <h2 className="mb-5 text-3xl font-bold leading-[1.1] md:text-5xl">
            {aboutLab.headline}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {aboutLab.support}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 md:gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            {...fadeUp}
            className="min-w-0 lg:col-span-5 lg:sticky lg:top-28"
          >
            <VerticalImageStack images={aboutLab.stack} />
            <p className="mt-4 hidden text-xs tracking-wide text-muted-foreground md:block">
              Drag or scroll here. Frames from the bench.
            </p>
          </motion.div>

          <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
            {aboutLab.photos.map((photo, i) => {
              const span =
                i === 2
                  ? "col-span-2"
                  : i === 4
                    ? "col-span-2 sm:col-span-1"
                    : undefined;

              return (
                <motion.div
                  key={photo.src}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={stagger(i, 0.05)}
                  className={span}
                >
                  <PhotoFrame image={photo} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

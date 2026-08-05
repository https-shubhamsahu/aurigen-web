"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PhotoFrame } from "@/components/about/PhotoFrame";
import { aboutRoots } from "@/content/about";
import { fadeUp, stagger } from "@/lib/motion";

/** Asymmetrical documentary masonry for institutional roots. */
export function AboutRoots() {
  return (
    <section className="border-t border-border bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14 lg:mb-20">
          <h2 className="mb-6 text-3xl font-bold leading-[1.1] md:text-4xl">
            {aboutRoots.title}
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {aboutRoots.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-12 md:gap-5">
          {aboutRoots.photos.map((photo, i) => {
            const span =
              i === 0
                ? "md:col-span-8"
                : i === 1
                  ? "md:col-span-4 md:mt-16"
                  : i === 2
                    ? "md:col-span-4 md:-mt-8"
                    : i === 3
                      ? "sm:col-span-2 md:col-span-8"
                      : i === 4
                        ? "sm:col-span-2 md:col-span-7 md:mt-4"
                        : i === 5
                          ? "md:col-span-5 md:mt-12"
                          : "md:col-span-5 md:-mt-4";

            return (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={stagger(i, 0.06)}
                className={span}
              >
                <PhotoFrame image={photo} />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          {...fadeUp}
          className="mt-12 flex flex-col items-start gap-6 border-t border-white/10 pt-8 sm:mt-16 sm:flex-row sm:items-center sm:gap-12 md:mt-20 md:pt-10"
        >
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Institutional marks
          </p>
          <div className="flex w-full flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-10">
            {aboutRoots.logos.map((logo) => (
              <div key={logo.src} className="flex min-w-0 items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 sm:h-20 sm:w-20">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {logo.label}
                  </p>
                  <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
                    {aboutRoots.institutionLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

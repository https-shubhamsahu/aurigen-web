"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { BuildLabMediaPlaceholder } from "@/components/workshops/buildlab-001/BuildLabMediaPlaceholder";
import { buildLabMedia } from "@/content/workshops/buildlab-001";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

type GalleryItem =
  | {
      id: string;
      kind: "video";
      src: string;
      webmSrc?: string;
      label: string;
    }
  | { id: string; kind: "image"; src: string; label: string; alt: string };

const items: GalleryItem[] = [
  {
    id: "demo",
    kind: "video",
    src: buildLabMedia.heroVideo,
    webmSrc: buildLabMedia.heroVideoWebm,
    label: "Robot walking demo",
  },
  {
    id: "robot-1",
    kind: "image",
    src: buildLabMedia.robotImage1,
    label: "Robot detail",
    alt: "ESP32 walking robot OLED dashboard and servo legs",
  },
  {
    id: "robot-2",
    kind: "image",
    src: buildLabMedia.robotImage2,
    label: "Robot assembled",
    alt: "Fully assembled ESP32 walking robot with glowing eyes",
  },
];

function GalleryTile({
  item,
  featured,
  onOpen,
}: {
  item: GalleryItem;
  featured?: boolean;
  onOpen: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative w-full overflow-hidden border border-white/10 bg-zinc-950 text-left outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40",
        featured ? "aspect-video" : "aspect-square sm:aspect-[4/3]",
      )}
      aria-label={`Open ${item.label}`}
    >
      {failed ? (
        <BuildLabMediaPlaceholder
          kind={item.kind}
          label={item.label}
          className="absolute inset-0 border-0"
          aspectClassName="h-full w-full"
        />
      ) : item.kind === "video" ? (
        <>
          {!loaded ? (
            <div className="absolute inset-0 animate-pulse bg-muted/50" aria-hidden />
          ) : null}
          <video
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]",
              loaded ? "opacity-100" : "opacity-0",
            )}
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setLoaded(true)}
            onError={() => setFailed(true)}
          >
            {item.webmSrc ? (
              <source src={item.webmSrc} type="video/webm" />
            ) : null}
            <source src={item.src} type="video/mp4" />
          </video>
        </>
      ) : (
        <>
          {!loaded ? (
            <div className="absolute inset-0 animate-pulse bg-muted/50" aria-hidden />
          ) : null}
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-[1.02]",
              loaded ? "opacity-100" : "opacity-0",
            )}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </>
      )}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-xs font-medium text-white/90 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {item.label}
      </span>
    </button>
  );
}

export function BuildLabGallery() {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-28 border-t border-border bg-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Media
          </p>
          <h2
            id="gallery-heading"
            className="text-3xl font-bold leading-[1.1] md:text-5xl"
          >
            Gallery
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={stagger(0)}
            className="md:col-span-2"
          >
            <GalleryTile
              item={items[0]}
              featured
              onOpen={() => setActive(items[0])}
            />
          </motion.div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            {items.slice(1).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={stagger(i + 1)}
              >
                <GalleryTile item={item} onOpen={() => setActive(item)} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.label}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setActive(null);
          }}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 flex size-11 items-center justify-center border border-white/20 bg-black/50 text-white"
            aria-label="Close gallery preview"
          >
            <X className="size-5" />
          </button>
          <div
            className="relative w-full max-w-4xl overflow-hidden border border-white/10 bg-zinc-950"
            onClick={(e) => e.stopPropagation()}
          >
            {active.kind === "video" ? (
              <video
                className="aspect-video w-full object-contain"
                controls
                autoPlay
                muted
                playsInline
                onError={() => {
                  /* keep dialog; placeholder already handled at tile level */
                }}
              >
                {active.webmSrc ? (
                  <source src={active.webmSrc} type="video/webm" />
                ) : null}
                <source src={active.src} type="video/mp4" />
              </video>
            ) : (
              <div className="relative aspect-video w-full">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}

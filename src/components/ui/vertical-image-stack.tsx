"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut } from "@/lib/motion";

export type StackImage = {
  id: string;
  src: string;
  alt: string;
};

type VerticalImageStackProps = {
  images: StackImage[];
  className?: string;
};

/** Mobile: two-up editorial strip. No drag, no wheel hijack. */
function MobileEditorialStrip({
  images,
  className,
}: {
  images: StackImage[];
  className?: string;
}) {
  const strip = images.slice(0, 2);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[var(--radius)] border border-white/10 bg-[#050505] md:hidden",
        className
      )}
      role="region"
      aria-label="Laboratory and workshop photographs"
    >
      <div
        className={cn(
          "grid gap-px bg-white/10",
          strip.length > 1 ? "grid-cols-2" : "grid-cols-1"
        )}
      >
        {strip.map((image, i) => (
          <div
            key={image.id}
            className="relative aspect-[3/4] overflow-hidden bg-zinc-950"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, 280px"
              className="object-cover"
              priority={i === 0}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopImageStack({
  images,
  className,
}: {
  images: StackImage[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragY = useMotionValue(0);
  const dragLineScale = useTransform(dragY, [-120, 0, 120], [1.4, 1, 1.4]);
  const dragLineOpacity = useTransform(dragY, [-80, 0, 80], [0.7, 0.25, 0.7]);
  const wheelLock = useRef(false);

  const count = images.length;
  const clampIndex = useCallback(
    (i: number) => ((i % count) + count) % count,
    [count]
  );

  const go = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setActive((prev) => clampIndex(prev + delta));
    },
    [clampIndex, count]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || count < 2) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      go(e.deltaY > 0 ? 1 : -1);
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 420);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [count, go]);

  const onPointerDown = (e: ReactPointerEvent) => {
    if (count < 2) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    dragY.set(0);
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging) return;
    dragY.set(e.movementY + dragY.get());
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    const y = dragY.get();
    dragY.set(0);
    if (Math.abs(y) > 48) go(y > 0 ? -1 : 1);
  };

  const current = images[active] ?? images[0];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate hidden overflow-hidden rounded-[var(--radius)] border border-white/10 bg-[#050505] md:block",
        className
      )}
      role="region"
      aria-roledescription="image stack"
      aria-label="Laboratory and workshop photographs"
    >
      <div
        className="relative mx-auto aspect-[4/5] w-full max-w-xl touch-none select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[7%] rounded-[calc(var(--radius)+2px)] border border-white/[0.06]"
        />

        <AnimatePresence initial={false} mode="popLayout">
          {images
            .map((image, i) => ({
              image,
              i,
              offset: (i - active + count) % count,
            }))
            .filter(({ offset }) => offset <= 2)
            .sort((a, b) => b.offset - a.offset)
            .map(({ image, i, offset }) => {
              const isFront = offset === 0;
              const scale = 1 - offset * 0.045;
              const y = offset * 14;
              const opacity = 1 - offset * 0.22;

              return (
                <motion.div
                  key={image.id}
                  className={cn(
                    "absolute inset-[8%] overflow-hidden rounded-[var(--radius)] border border-white/10 bg-zinc-950",
                    isFront
                      ? "cursor-grab active:cursor-grabbing"
                      : "pointer-events-none"
                  )}
                  style={{
                    zIndex: 30 - offset,
                    ...(isFront && dragging
                      ? { y: dragY, scale, opacity }
                      : {}),
                  }}
                  initial={
                    reduced ? false : { opacity: 0, y: 24, scale: 0.96 }
                  }
                  animate={
                    isFront && dragging
                      ? undefined
                      : {
                          opacity,
                          y,
                          scale,
                          transition: { duration: 0.45, ease: easeOut },
                        }
                  }
                  exit={
                    reduced
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: -28,
                          scale: 0.94,
                          transition: { duration: 0.28, ease: easeOut },
                        }
                  }
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="520px"
                    className="object-cover"
                    draggable={false}
                    priority={i === 0}
                  />
                  {isFront ? (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
                    />
                  ) : null}
                </motion.div>
              );
            })}
        </AnimatePresence>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[8%] z-40 h-8 w-px -translate-x-1/2 bg-white/20"
          style={{
            scaleY: dragLineScale,
            opacity: dragLineOpacity,
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <span className="text-foreground">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="mx-2 text-white/20">/</span>
          <span>{String(count).padStart(2, "0")}</span>
        </p>

        <div
          className="flex items-center gap-1"
          role="tablist"
          aria-label="Select photograph"
        >
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show photograph ${i + 1}`}
              onClick={() => setActive(i)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === active
                    ? "h-1.5 w-6 bg-accent"
                    : "h-1.5 w-1.5 bg-white/25 hover:bg-white/45"
                )}
              />
            </button>
          ))}
        </div>

        <p className="hidden max-w-[10rem] truncate text-right text-xs text-muted-foreground lg:block">
          {current.alt}
        </p>
      </div>

      <p className="sr-only" aria-live="polite">
        Photograph {active + 1} of {count}: {current.alt}
      </p>
    </div>
  );
}

/**
 * Editorial vertical stack on md+.
 * Below md: a simple two-up strip (no drag / wheel hijack).
 */
export function VerticalImageStack({
  images,
  className,
}: VerticalImageStackProps) {
  if (images.length === 0) return null;

  return (
    <>
      <MobileEditorialStrip images={images} className={className} />
      <DesktopImageStack images={images} className={className} />
    </>
  );
}

export default VerticalImageStack;

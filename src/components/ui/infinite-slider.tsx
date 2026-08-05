"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, animate, motion } from "motion/react";
import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  /** Pixels per second (preferred API used by Tailark hero-section-5) */
  speed?: number;
  speedOnHover?: number;
  /** Seconds per loop — alias for older motion-primitives API */
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  duration,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const [hovering, setHovering] = useState(false);

  const size = direction === "horizontal" ? width : height;
  const contentSize = size + gap;

  // When `duration` is provided, derive an equivalent px/s speed from content size.
  const resolvedSpeed =
    duration && contentSize > 0 ? contentSize / duration : speed;
  const resolvedHoverSpeed =
    durationOnHover && contentSize > 0
      ? contentSize / durationOnHover
      : speedOnHover;

  const currentSpeed =
    hovering && resolvedHoverSpeed != null
      ? resolvedHoverSpeed
      : resolvedSpeed;

  useEffect(() => {
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    const distanceToTravel = Math.abs(to - from);
    if (distanceToTravel === 0 || currentSpeed === 0) return;

    const loopDuration = distanceToTravel / currentSpeed;

    const controls = isTransitioning
      ? animate(translation, [translation.get(), to], {
          ease: "linear",
          duration: Math.abs(translation.get() - to) / currentSpeed,
          onComplete: () => {
            setIsTransitioning(false);
            setKey((prevKey) => prevKey + 1);
          },
        })
      : animate(translation, [from, to], {
          ease: "linear",
          duration: loopDuration,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
          onRepeat: () => {
            translation.set(from);
          },
        });

    return () => controls.stop();
  }, [
    key,
    translation,
    currentSpeed,
    contentSize,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps =
    resolvedHoverSpeed != null
      ? {
          onHoverStart: () => {
            setIsTransitioning(true);
            setHovering(true);
          },
          onHoverEnd: () => {
            setIsTransitioning(true);
            setHovering(false);
          },
        }
      : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

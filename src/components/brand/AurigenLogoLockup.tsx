"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Real brand mark — robot-in-A with yellow right stroke + eye accents.
 *  Transparent-bg derivative of light_onlyicon (white canvas knocked out). */
const ICON_SRC = "/logos/aurigen_logo_nav_icon.png";
const ICON_W = 778;
const ICON_H = 644;

const WHITE = "#FAFAFA";
const MUTED = "#A3A3A3";

/** Full cycle: white → muted → full-color yellow reveal → hold → back */
const CYCLE_S = 3.4;

const ease = [0.45, 0, 0.55, 1] as const;

/** Shade lift over the white base (dark-bg lockup) */
const SHADE_OPACITY = [0, 0, 1, 1, 0.35, 0];
const SHADE_TIMES = [0, 0.12, 0.28, 0.42, 0.78, 1];

/** Full-color layer — yellow right leg + robot accents become obvious */
const COLOR_OPACITY = [0, 0, 0, 1, 1, 0];
const COLOR_TIMES = [0, 0.28, 0.4, 0.55, 0.78, 1];

const WORDMARK_COLORS = [WHITE, WHITE, MUTED, WHITE, WHITE, WHITE];
const WORDMARK_TIMES = [0, 0.12, 0.28, 0.55, 0.78, 1];

type AurigenLogoLockupProps = {
  className?: string;
  /** Icon height in px; wordmark scales with it. Default 32. */
  height?: number;
  /** Show “Aurigen” wordmark beside the mark. Default true. */
  showWordmark?: boolean;
  /** Play the color loop. Default true. */
  animated?: boolean;
};

function AurigenMark({
  size,
  play,
}: {
  size: number;
  play: boolean;
}) {
  const width = Math.round(size * (ICON_W / ICON_H));

  return (
    <span
      className="relative inline-block shrink-0 overflow-hidden"
      style={{ width, height: size }}
      aria-hidden="true"
    >
      {/* Base — solid white silhouette for dark backgrounds */}
      <Image
        src={ICON_SRC}
        alt=""
        width={ICON_W}
        height={ICON_H}
        className="absolute inset-0 size-full object-contain"
        style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
        priority
      />

      {/* Mid — muted / shaded lift */}
      <motion.span
        className="absolute inset-0 block"
        initial={false}
        animate={play ? { opacity: SHADE_OPACITY } : { opacity: 0 }}
        transition={
          play
            ? {
                duration: CYCLE_S,
                ease,
                times: SHADE_TIMES,
                repeat: Infinity,
              }
            : { duration: 0 }
        }
      >
        <Image
          src={ICON_SRC}
          alt=""
          width={ICON_W}
          height={ICON_H}
          className="size-full object-contain"
          style={{
            filter: "grayscale(1) brightness(0) invert(1) opacity(0.55)",
          }}
        />
      </motion.span>

      {/* Top — full color: yellow right stroke + robot eyes/ears */}
      <motion.span
        className="absolute inset-0 block"
        initial={false}
        animate={play ? { opacity: COLOR_OPACITY } : { opacity: 1 }}
        transition={
          play
            ? {
                duration: CYCLE_S,
                ease,
                times: COLOR_TIMES,
                repeat: Infinity,
              }
            : { duration: 0 }
        }
      >
        <Image
          src={ICON_SRC}
          alt=""
          width={ICON_W}
          height={ICON_H}
          className="size-full object-contain"
        />
      </motion.span>
    </span>
  );
}

export function AurigenLogoLockup({
  className,
  height = 32,
  showWordmark = true,
  animated = true,
}: AurigenLogoLockupProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const play = animated && !reducedMotion;
  const wordSize = Math.round(height * 0.72);

  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      role="img"
      aria-label="Aurigen"
    >
      <AurigenMark size={height} play={play} />
      {showWordmark ? (
        <motion.span
          className="font-heading font-bold tracking-tight leading-none select-none"
          style={{ fontSize: wordSize }}
          initial={false}
          animate={play ? { color: WORDMARK_COLORS } : { color: WHITE }}
          transition={
            play
              ? {
                  duration: CYCLE_S,
                  ease,
                  times: WORDMARK_TIMES,
                  repeat: Infinity,
                }
              : { duration: 0 }
          }
        >
          Aurigen
        </motion.span>
      ) : null}
    </span>
  );
}

export default AurigenLogoLockup;

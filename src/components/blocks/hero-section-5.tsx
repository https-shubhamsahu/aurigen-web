"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronRight,
  Microscope,
  Printer,
  Package,
  Bot,
  BookOpen,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useScroll, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Why Aurigen", href: "#why" },
  { name: "Programs", href: "#programs" },
  { name: "Projects", href: "#projects" },
  { name: "For Schools", href: "#schools" },
  { name: "Community", href: "#community" },
  { name: "Contact", href: "#contact" },
];

const expertiseItems: { label: string; icon: LucideIcon }[] = [
  { label: "STEM Equipment", icon: Microscope },
  { label: "3D Printing", icon: Printer },
  { label: "DIY Kits", icon: Package },
  { label: "Robotics", icon: Bot },
  { label: "Planned Syllabus", icon: BookOpen },
  { label: "Complete Mentoring", icon: Users },
];

/** White lockup for dark surfaces — no color-loop animation. */
function HeroLogo() {
  return (
    <span className="inline-flex items-center gap-2.5" aria-hidden="true">
      <Image
        src="/logos/aurigen_logo_dark_custom.png"
        alt=""
        width={778}
        height={644}
        className="h-[34px] w-auto object-contain"
        priority
      />
      <span className="font-heading text-[1.55rem] font-bold leading-none tracking-tight select-none text-white">
        Aurigen
      </span>
    </span>
  );
}

export function HeroHeader() {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  React.useEffect(() => {
    if (!menuState) return;

    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateOverflow = () => {
      document.documentElement.classList.toggle(
        "overflow-hidden",
        mediaQuery.matches
      );
    };

    updateOverflow();
    mediaQuery.addEventListener("change", updateOverflow);

    return () => {
      mediaQuery.removeEventListener("change", updateOverflow);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [menuState]);

  return (
    <header>
      <nav
        data-state={menuState ? "active" : undefined}
        className="fixed z-20 w-full pt-2"
      >
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12",
            scrolled && "bg-zinc-950/85 backdrop-blur-2xl border border-white/10 shadow-black/40"
          )}
        >
          <motion.div
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6",
              scrolled && "lg:py-4"
            )}
          >
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link
                href="/"
                aria-label="Aurigen home"
                className="flex items-center"
              >
                <HeroLogo />
              </Link>

              <button
                type="button"
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                aria-expanded={menuState}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 text-white lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="block duration-150 text-white/70 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black/40 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className="block duration-150 text-white/70 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <a href="#contact" onClick={() => setMenuState(false)}>
                  <Button size="sm" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
}

/** Seconds of video time scrubbed backward per real second (≈2.5× reverse). */
const DNA_REVERSE_RATE = 2.5;
/** Cap reverse seeks at 30fps so the decoder isn't flooded. */
const DNA_REVERSE_FPS = 30;
const DNA_REVERSE_FRAME_MS = 1000 / DNA_REVERSE_FPS;
/** Fixed video-time step per 30fps tick. */
const DNA_REVERSE_STEP = (1 / DNA_REVERSE_FPS) * DNA_REVERSE_RATE;
/** Start reverse when this close to the end (avoids ended-event gaps). */
const DNA_END_EPSILON = 0.12;

export default function HeroSection() {
  const dnaVideoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = dnaVideoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const tryPlay = () => {
      video.play().catch(() => {
        /* Autoplay can be blocked; muted + playsInline usually allows it. */
      });
    };

    // Reduced motion: static first frame — no reverse scrubbing.
    if (reducedMotion) {
      video.loop = false;
      video.pause();
      const showFrame = () => {
        video.currentTime = 0;
        video.pause();
      };
      if (video.readyState >= 1) showFrame();
      else video.addEventListener("loadedmetadata", showFrame, { once: true });
      return () => video.removeEventListener("loadedmetadata", showFrame);
    }

    // Forward at normal speed → seek-gated 30fps reverse (one equal step after each seeked).
    video.loop = false;
    let reversing = false;
    let reverseTimer = 0;
    let targetTime = 0;
    let activeSeekHandler: (() => void) | null = null;

    const clearReverseTimer = () => {
      if (reverseTimer) {
        clearTimeout(reverseTimer);
        reverseTimer = 0;
      }
    };

    const detachSeekHandler = () => {
      if (activeSeekHandler) {
        video.removeEventListener("seeked", activeSeekHandler);
        activeSeekHandler = null;
      }
    };

    const playForward = () => {
      reversing = false;
      clearReverseTimer();
      detachSeekHandler();
      video.playbackRate = 1;
      tryPlay();
    };

    const scheduleNextReverseFrame = (seekElapsedMs: number) => {
      if (!reversing) return;
      const wait = Math.max(0, DNA_REVERSE_FRAME_MS - seekElapsedMs);
      reverseTimer = window.setTimeout(reverseStep, wait);
    };

    const reverseStep = () => {
      if (!reversing) return;

      if (targetTime <= 0) {
        if (video.currentTime <= 0.01) {
          playForward();
          return;
        }
        const onZero = () => {
          detachSeekHandler();
          playForward();
        };
        activeSeekHandler = onZero;
        video.addEventListener("seeked", onZero);
        video.currentTime = 0;
        return;
      }

      targetTime = Math.max(0, targetTime - DNA_REVERSE_STEP);
      const t0 = performance.now();

      const onSeeked = () => {
        detachSeekHandler();
        if (!reversing) return;
        const elapsed = performance.now() - t0;
        if (targetTime <= 0 && video.currentTime <= 0.02) {
          playForward();
          return;
        }
        scheduleNextReverseFrame(elapsed);
      };

      activeSeekHandler = onSeeked;
      video.addEventListener("seeked", onSeeked);
      video.currentTime = targetTime;
    };

    const startReverse = () => {
      if (reversing) return;
      reversing = true;
      clearReverseTimer();
      detachSeekHandler();
      video.pause();
      targetTime = video.currentTime;
      reverseStep();
    };

    const onTimeUpdate = () => {
      if (reversing || !video.duration) return;
      if (video.currentTime >= video.duration - DNA_END_EPSILON) {
        startReverse();
      }
    };

    const onEnded = () => {
      if (!reversing) startReverse();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("loadeddata", tryPlay);
    tryPlay();

    return () => {
      reversing = false;
      clearReverseTimer();
      detachSeekHandler();
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, []);

  return (
    <>
      <HeroHeader />
      <div className="overflow-x-hidden bg-[#0A0A0A]">
        {/* Dark field — Tailark DNA helix tinted amber/yellow (#FFC107 family). */}
        <section
          aria-label="Aurigen — Build the Future with AI & Robotics"
          className="relative -mb-px overflow-hidden bg-[#0A0A0A]"
        >
          <div className="aspect-2/3 relative z-10 flex flex-col justify-end px-6 lg:aspect-video">
            <div className="mx-auto w-full max-w-7xl pb-6 lg:px-12 lg:pb-32">
              <div className="max-w-lg">
                <h1 className="text-balance text-5xl font-extrabold text-white md:text-6xl xl:text-7xl">
                  Build the Future with AI &amp; Robotics
                </h1>
                <p className="mt-6 text-balance text-lg text-zinc-300">
                  Aurigen builds innovators, engineers, creators, and founders
                  through hands-on AI and robotics — not lectures, not coaching.
                </p>

                <div className="mt-8 flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                  <Link href="#contact">
                    <Button
                      size="lg"
                      className="h-12 rounded-full pl-5 pr-3 text-base group"
                    >
                      <span className="text-nowrap">Start Building</span>
                      <ChevronRight className="ml-1 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                  <Link href="#why">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="h-12 rounded-full px-5 text-base text-white hover:bg-white/10 hover:text-white"
                    >
                      <span className="text-nowrap">Why Aurigen</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* No border/ring/shadow — avoids light fringe at the rounded clip edge. */}
          <div className="aspect-2/3 pointer-events-none absolute inset-1 overflow-hidden rounded-3xl bg-[#0A0A0A] lg:aspect-video lg:rounded-[3rem]">
            <video
              ref={dnaVideoRef}
              autoPlay
              muted
              playsInline
              // White particles → gold/yellow; blacks stay near-black (no invert/grayscale).
              className="size-full -scale-x-100 object-cover opacity-[0.82] [filter:sepia(1)_saturate(7)_hue-rotate(8deg)_brightness(1.08)]"
              src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
            />
            {/* Reinforces #FFC107 family on bright particles; mix-blend-color keeps blacks black. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[#FFC107]/35 mix-blend-color"
            />
          </div>
        </section>

        <section
          aria-labelledby="our-expertise-heading"
          className="bg-[#0A0A0A] py-14 md:py-16"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center text-center">
              <h2
                id="our-expertise-heading"
                className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              >
                Our Expertise
              </h2>
              <div
                className="mt-3 h-0.5 w-10 rounded-full bg-accent"
                aria-hidden="true"
              />
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6">
              {expertiseItems.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <span className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-zinc-900">
                    <Icon className="size-5 text-accent" strokeWidth={1.75} />
                  </span>
                  <span className="max-w-[9rem] text-sm font-medium leading-snug text-foreground">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

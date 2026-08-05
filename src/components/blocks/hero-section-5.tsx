"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
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

/** Capabilities as plain text — no lucide-in-circle icon grid. */
const expertiseItems = [
  "STEM Equipment",
  "3D Printing",
  "DIY Kits",
  "Robotics",
  "Planned Syllabus",
  "Complete Mentoring",
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
        className={cn(
          "fixed z-20 w-full border-b transition-colors duration-300",
          scrolled
            ? "border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-4 duration-200 lg:gap-0",
              scrolled ? "lg:py-3.5" : "lg:py-5"
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

            <div className="in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 border border-white/10 bg-[#0A0A0A] p-6 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0">
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

/** Soft dissolve before restarting from the top (avoids hard cuts + reverse seeks). */
const DNA_FADE_MS = 520;
/** Begin fade slightly before ended so the dissolve covers the seek. */
const DNA_END_EPSILON = 0.18;
const DNA_REST_OPACITY = "0.82";

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

    // Reduced motion: static first frame — no looping.
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

    // Forward-only loop: hold → opacity dissolve → seek to start → fade in.
    // One seek per cycle (cheap) instead of 30fps reverse scrubbing (laggy).
    video.loop = false;
    video.style.opacity = DNA_REST_OPACITY;
    let fading = false;
    let fadeTimer = 0;
    let activeSeekHandler: (() => void) | null = null;

    const clearFadeTimer = () => {
      if (fadeTimer) {
        clearTimeout(fadeTimer);
        fadeTimer = 0;
      }
    };

    const detachSeekHandler = () => {
      if (activeSeekHandler) {
        video.removeEventListener("seeked", activeSeekHandler);
        activeSeekHandler = null;
      }
    };

    const softRestart = () => {
      if (fading) return;
      fading = true;
      video.pause();
      video.style.transition = `opacity ${DNA_FADE_MS}ms ease-in-out`;
      video.style.opacity = "0";

      fadeTimer = window.setTimeout(() => {
        let resumed = false;
        const resume = () => {
          if (resumed) return;
          resumed = true;
          detachSeekHandler();
          tryPlay();
          // Next frame so the browser applies opacity 0 before fading back in.
          requestAnimationFrame(() => {
            video.style.opacity = DNA_REST_OPACITY;
            fading = false;
          });
        };

        if (video.currentTime <= 0.02) {
          resume();
          return;
        }

        activeSeekHandler = resume;
        video.addEventListener("seeked", resume);
        video.currentTime = 0;
        // Some mobile browsers skip seeked; don't leave the hero stuck dark.
        fadeTimer = window.setTimeout(resume, 400);
      }, DNA_FADE_MS);
    };

    const onTimeUpdate = () => {
      if (fading || !video.duration) return;
      if (video.currentTime >= video.duration - DNA_END_EPSILON) {
        softRestart();
      }
    };

    const onEnded = () => {
      if (!fading) softRestart();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("loadeddata", tryPlay);
    tryPlay();

    return () => {
      fading = false;
      clearFadeTimer();
      detachSeekHandler();
      video.style.transition = "";
      video.style.opacity = "";
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, []);

  return (
    <>
      <HeroHeader />
      <div className="overflow-x-hidden bg-[#0A0A0A]">
        {/* Full-bleed visual plane — content offset left, art bleeds through. */}
        <section
          aria-label="Aurigen — Build the Future with AI & Robotics"
          className="relative min-h-[100svh] overflow-hidden bg-[#0A0A0A]"
        >
          {/* Edge-to-edge media (no inset rounded card). */}
          <div className="pointer-events-none absolute inset-0 bg-[#0A0A0A]">
            <video
              ref={dnaVideoRef}
              autoPlay
              muted
              playsInline
              className="size-full -scale-x-100 object-cover opacity-[0.82] [filter:sepia(1)_saturate(7)_hue-rotate(8deg)_brightness(1.08)] will-change-[opacity]"
              src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[#FFC107]/35 mix-blend-color"
            />
            {/* Readability scrim — denser on the content side */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/55 to-[#0A0A0A]/20"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40"
            />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl grid-cols-1 content-end px-6 pb-16 pt-28 lg:grid-cols-[minmax(0,38rem)_1fr] lg:content-end lg:px-12 lg:pb-28 lg:pt-32">
            <div className="max-w-lg">
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-white md:text-base">
                Aurigen
              </p>
              <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
                Build the Future with AI &amp; Robotics
              </h1>
              <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-zinc-300">
                Hands-on AI and robotics for innovators, engineers, creators,
                and founders — not lectures, not coaching.
              </p>

              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link href="#contact">
                  <Button size="lg" className="group h-12 pl-5 pr-3 text-base">
                    <span className="text-nowrap">Start Building</span>
                    <ChevronRight className="ml-1 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link href="#why">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-5 text-base text-white border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <span className="text-nowrap">Why Aurigen</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Text strip — breaks the “6 lucide icons in circles” AI fingerprint */}
        <section
          aria-labelledby="our-expertise-heading"
          className="border-t border-white/10 bg-[#0A0A0A] py-12 md:py-14"
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[minmax(0,14rem)_1fr] lg:items-end lg:gap-16 lg:px-12">
            <div>
              <h2
                id="our-expertise-heading"
                className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground"
              >
                What we equip
              </h2>
              <div
                className="mt-3 h-px w-8 bg-accent"
                aria-hidden="true"
              />
            </div>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8">
              {expertiseItems.map((label) => (
                <li
                  key={label}
                  className="text-sm font-medium text-foreground md:text-[15px]"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

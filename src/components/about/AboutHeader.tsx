"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useScroll, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildLabPath } from "@/content/workshops/buildlab-001";

const menuItems = [
  { name: "Why", href: "/#why" },
  { name: "Method", href: "/#method" },
  { name: "Tracks", href: "/#programs" },
  { name: "Work", href: "/#projects" },
  { name: "Labs", href: "/#schools" },
  { name: "BuildLab", href: buildLabPath },
  { name: "About", href: "/about/" },
  { name: "Apply", href: "/#contact" },
];

function Logo() {
  return (
    <span
      className="inline-flex max-w-[min(100%,14rem)] items-center gap-2 sm:max-w-none sm:gap-2.5"
      aria-hidden="true"
    >
      <Image
        src="/logos/aurigen_logo_dark_custom.png"
        alt=""
        width={778}
        height={644}
        className="h-7 w-auto shrink-0 object-contain sm:h-[34px]"
        priority
      />
      <span className="font-heading text-[1.35rem] font-bold leading-none tracking-tight select-none text-white sm:text-[1.55rem]">
        Aurigen
      </span>
    </span>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#")) return false;
  if (href === buildLabPath) {
    return pathname.startsWith("/workshops/buildlab-001");
  }
  if (href === "/about/") {
    return pathname.startsWith("/about");
  }
  return pathname === href;
}

/** Site chrome for interior pages. Matches homepage hero nav language. */
export function AboutHeader() {
  const pathname = usePathname() || "/";
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.02);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  React.useEffect(() => {
    if (!menuState) return;
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateOverflow = () => {
      document.documentElement.classList.toggle(
        "overflow-hidden",
        mediaQuery.matches,
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
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-4 duration-200 lg:gap-0",
              scrolled ? "lg:py-3.5" : "lg:py-5",
            )}
            initial={false}
            animate={reducedMotion ? undefined : { opacity: 1 }}
          >
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link
                href="/"
                aria-label="Aurigen home"
                className="flex items-center"
              >
                <Logo />
              </Link>

              <button
                type="button"
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                aria-expanded={menuState}
                className="relative z-20 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-white lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-7 text-sm xl:gap-8">
                  {menuItems.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block duration-150 text-white/70 hover:text-white",
                            active && "text-white",
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-6 border border-white/10 bg-[#0A0A0A] p-6 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0">
              <div className="w-full lg:hidden">
                <ul className="space-y-1 text-base">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className="flex min-h-11 items-center duration-150 text-white/70 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Link
                  href={
                    pathname.startsWith("/workshops/buildlab-001")
                      ? "#register"
                      : "/#contact"
                  }
                  onClick={() => setMenuState(false)}
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" className="h-11 w-full sm:w-auto">
                    {pathname.startsWith("/workshops/buildlab-001")
                      ? "Reserve Seat"
                      : "Apply"}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
}

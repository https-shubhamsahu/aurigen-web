"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Why", href: "/#why" },
  { label: "Method", href: "/#method" },
  { label: "Tracks", href: "/#programs" },
  { label: "Work", href: "/#projects" },
  { label: "Labs", href: "/#schools" },
  { label: "About", href: "/about/" },
  { label: "Apply", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
          isScrolled
            ? "h-16 border-border bg-background/90 backdrop-blur-md"
            : "h-20 border-transparent bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex-shrink-0" aria-label="Aurigen home">
            <Image
              src="/logos/aurigen_logo_dark_custom.png"
              alt="Aurigen"
              width={140}
              height={32}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/#contact">
              <Button size="default">Apply to build</Button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden p-2 text-foreground rounded-md focus-visible:ring-2 focus-visible:ring-ring/30"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border bg-background lg:hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-1" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-base font-medium text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="pt-4"
              >
                <Button className="w-full" size="lg">
                  Apply to build
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/** Sticky mobile CTA that hides near the registration form. */
export function BuildLabStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const register = document.getElementById("register");
    if (!register) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(register);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#0A0A0A]/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <Link href="#register" className="block">
        <Button size="lg" className="h-12 w-full">
          Reserve Your Seat
        </Button>
      </Link>
    </div>
  );
}

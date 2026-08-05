"use client";

import { useEffect, useState } from "react";
import { buildLabSectionNav } from "@/content/workshops/buildlab-001";
import { cn } from "@/lib/utils";

type SectionId = (typeof buildLabSectionNav)[number]["id"];

export function BuildLabSectionNav() {
  const [active, setActive] = useState<SectionId>(
    buildLabSectionNav[0]?.id ?? "register",
  );

  useEffect(() => {
    const ids = buildLabSectionNav.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target?.id as SectionId | undefined;
        if (id && ids.includes(id)) {
          setActive(id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Workshop sections"
      className="sticky top-[4.25rem] z-10 hidden border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md lg:block"
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 py-2 lg:px-12">
        {buildLabSectionNav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "shrink-0 px-3 py-2 text-xs font-medium text-white/55 transition-colors hover:text-white",
              active === item.id && "text-accent",
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

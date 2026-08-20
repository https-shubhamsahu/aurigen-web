"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import {
  BUILDERS_PATH,
  CHALLENGE_PATH,
  LAB_PATH,
  SOCIAL_PATH,
  VLOG_PATH,
  WORKSHOP_PATH,
} from "@/lib/workshop-config";
import { cn } from "@/lib/utils";

const links = [
  { href: WORKSHOP_PATH, label: "Hub", match: "hub" },
  { href: LAB_PATH, label: "Code", match: "lab" },
  { href: BUILDERS_PATH, label: "Builders", match: "builders" },
  { href: VLOG_PATH, label: "Vlog", match: "vlog" },
  { href: CHALLENGE_PATH, label: "7-Day", match: "challenge" },
  { href: SOCIAL_PATH, label: "Social Kit", match: "social" },
] as const;

function isActive(pathname: string, match: (typeof links)[number]["match"]): boolean {
  if (match === "hub") {
    return (
      pathname === "/workshops/esp32-walking-robot" ||
      pathname === "/workshops/esp32-walking-robot/"
    );
  }
  if (match === "lab") return pathname.startsWith("/labs/esp32-walking-robot");
  if (match === "builders") return pathname.startsWith("/builders");
  if (match === "vlog") return pathname.includes("/vlog");
  if (match === "challenge") return pathname.includes("/7-day-challenge");
  if (match === "social") return pathname.includes("/social-kit");
  return false;
}

export function WorkshopSubnav() {
  const pathname = usePathname() || "/";

  return (
    <nav
      aria-label="Workshop sections"
      className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        {links.map((link) => {
          const active = isActive(pathname, link.match);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() =>
                track("workshop_nav_clicked", { href: link.href, label: link.label })
              }
              className={cn(
                "shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

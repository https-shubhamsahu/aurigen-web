import Link from "next/link";
import { AurigenLogoLockup } from "@/components/brand/AurigenLogoLockup";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Why", href: "/#why" },
      { label: "Method", href: "/#method" },
      { label: "Tracks", href: "/#programs" },
      { label: "Work", href: "/#projects" },
    ],
  },
  {
    title: "Audiences",
    links: [
      { label: "For Students", href: "/#method" },
      { label: "For Parents", href: "/#parents" },
      { label: "Labs", href: "/#schools" },
      { label: "Cohort", href: "/#community" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "ESP32 Workshop", href: "/workshops/esp32-walking-robot/" },
      { label: "Builders", href: "/builders/" },
      { label: "Code Library", href: "/labs/esp32-walking-robot/" },
      { label: "FAQ", href: "/about/#faq" },
      { label: "Future", href: "/#vision" },
      { label: "Apply", href: "/#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 lg:mb-16 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <Link href="/" className="mb-5 inline-flex" aria-label="Aurigen home">
              <AurigenLogoLockup height={28} />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              An engineering institution forging AI engineers, robotics
              innovators, builders, researchers, and founders.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title} className="min-w-0">
                <h4 className="mb-3 text-xs font-heading font-semibold uppercase tracking-wider text-foreground sm:mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aurigen. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Forge builders of intelligent machines.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { AurigenLogoLockup } from "@/components/brand/AurigenLogoLockup";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Why Aurigen", href: "#why" },
      { label: "How You Learn", href: "#journey" },
      { label: "Programs", href: "#programs" },
      { label: "Projects", href: "#projects" },
    ],
  },
  {
    title: "Audiences",
    links: [
      { label: "For Students", href: "#journey" },
      { label: "For Parents", href: "#parents" },
      { label: "For Schools", href: "#schools" },
      { label: "Community", href: "#community" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Vision", href: "#vision" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex mb-5" aria-label="Aurigen home">
              <AurigenLogoLockup height={28} />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              An AI and Robotics company building the next generation of
              innovators, engineers, creators, and founders.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aurigen. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Build the Future with AI &amp; Robotics.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "framer-motion";
import { PhotoFrame } from "@/components/about/PhotoFrame";
import {
  aboutFounders,
  aboutPeople,
  type FounderProfile,
} from "@/content/about";
import { fadeUp, stagger } from "@/lib/motion";

type FounderLink = {
  label: string;
  href: string;
  external?: boolean;
};

function founderLinks(links: FounderProfile["links"]): FounderLink[] {
  const items: FounderLink[] = [];
  if (links.github) {
    items.push({ label: "GitHub", href: links.github, external: true });
  }
  if (links.linkedin) {
    items.push({ label: "LinkedIn", href: links.linkedin, external: true });
  }
  if (links.x) {
    items.push({ label: "X", href: links.x, external: true });
  }
  if (links.instagram) {
    items.push({ label: "Instagram", href: links.instagram, external: true });
  }
  if (links.email) {
    items.push({ label: "Email", href: links.email });
  }
  return items;
}

export function AboutFounders() {
  return (
    <section className="border-t border-border bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-12 max-w-2xl md:mb-16 lg:mb-24">
          <h2 className="mb-6 text-3xl font-bold leading-[1.1] md:text-4xl">
            {aboutPeople.title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {aboutPeople.support}
          </p>
        </motion.div>

        <div className="space-y-0">
          {aboutFounders.map((founder, i) => {
            const reverse = i % 2 === 1;
            const links = founderLinks(founder.links);
            return (
              <motion.article
                key={founder.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={stagger(i)}
                className="border-t border-white/10 py-10 md:py-14 lg:py-20"
              >
                <div
                  className={`grid grid-cols-1 items-start gap-8 md:gap-10 lg:grid-cols-12 lg:gap-16 ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="min-w-0 lg:col-span-5">
                    <PhotoFrame
                      image={founder.portrait}
                      showCaption={false}
                      priority={i === 0}
                      className="mx-auto max-w-sm sm:mx-0 sm:max-w-md"
                    />
                  </div>

                  <div className="min-w-0 lg:col-span-7">
                    <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                      {founder.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-accent">
                      {founder.role}
                    </p>

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
                      {founder.intro}
                    </p>

                    <div className="mt-8 max-w-xl border-t border-white/10 pt-6">
                      <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Areas of Focus
                      </p>
                      <ul className="space-y-1.5">
                        {founder.areasOfFocus.map((area) => (
                          <li
                            key={area}
                            className="text-sm text-foreground/80"
                          >
                            {area}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {links.length > 0 ? (
                      <nav
                        aria-label={`${founder.name} links`}
                        className="mt-8 flex flex-wrap gap-x-2 gap-y-1"
                      >
                        {links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            {...(link.external
                              ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                              : {})}
                            className="inline-flex min-h-11 items-center px-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link.label}
                          </a>
                        ))}
                      </nav>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

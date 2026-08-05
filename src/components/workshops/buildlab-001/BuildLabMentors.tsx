"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { buildLabMentors } from "@/content/workshops/buildlab-001";
import { fadeUp, stagger } from "@/lib/motion";

type Social = {
  label: string;
  href: string;
  external?: boolean;
};

function mentorSocials(
  links: (typeof buildLabMentors)[number]["links"],
): Social[] {
  const items: Social[] = [];
  if (links.email) items.push({ label: "Email", href: links.email });
  if (links.github)
    items.push({ label: "GitHub", href: links.github, external: true });
  if (links.linkedin)
    items.push({ label: "LinkedIn", href: links.linkedin, external: true });
  if (links.instagram)
    items.push({ label: "Instagram", href: links.instagram, external: true });
  return items;
}

export function BuildLabMentors() {
  return (
    <section
      id="mentors"
      aria-labelledby="mentors-heading"
      className="scroll-mt-28 border-t border-border bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Mentors
          </p>
          <h2
            id="mentors-heading"
            className="text-3xl font-bold leading-[1.1] md:text-5xl"
          >
            Meet Your Mentors
          </h2>
        </motion.div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {buildLabMentors.map((mentor, i) => {
            const socials = mentorSocials(mentor.links);
            return (
              <motion.li
                key={mentor.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={stagger(i)}
                className="group overflow-hidden border border-white/10 bg-card/40 transition-colors hover:border-accent/35"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950 sm:aspect-[5/4]">
                  <Image
                    src={mentor.portrait.src}
                    alt={mentor.portrait.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{
                      objectPosition: mentor.portrait.objectPosition ?? "center",
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-bold tracking-tight md:text-2xl">
                    {mentor.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {mentor.role}
                  </p>
                  {socials.length > 0 ? (
                    <nav
                      aria-label={`${mentor.name} links`}
                      className="mt-6 flex flex-wrap gap-x-1 gap-y-1"
                    >
                      {socials.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          {...(social.external
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                          className="inline-flex min-h-11 items-center px-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {social.label}
                        </a>
                      ))}
                    </nav>
                  ) : null}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

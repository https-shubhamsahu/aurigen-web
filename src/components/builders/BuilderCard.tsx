"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types/workshop-ecosystem";
import { AwardBadge, BotIdBadge } from "@/components/builders/Badges";
import { builderHeadline } from "@/content/builders/seed";
import { fadeUp, stagger } from "@/lib/motion";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function BuilderCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const reduced = useReducedMotion();
  const image = project.images[0];
  const headline = builderHeadline(project);
  const showTeamUnderHeadline =
    Boolean(project.robotName?.trim()) &&
    project.robotName?.trim() !== project.teamName;

  return (
    <motion.article
      {...(reduced ? {} : fadeUp)}
      transition={stagger(index, 0.05)}
      className="group overflow-hidden rounded-md border border-white/10 bg-card"
    >
      <Link
        href={`/builders/${project.botId}/`}
        className="block"
        onClick={() =>
          track("builder_profile_viewed", { botId: project.botId, source: "card" })
        }
      >
        <div className="relative aspect-[4/3] bg-muted">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
              Robot photo not published yet
            </div>
          )}
        </div>
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <BotIdBadge botId={project.botId} />
            {project.isSample ? (
              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Sample
              </span>
            ) : (
              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Registered
              </span>
            )}
            {project.featured ? <AwardBadge label="Featured" /> : null}
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold tracking-tight">
              {headline}
            </h3>
            {showTeamUnderHeadline ? (
              <p className="text-sm text-muted-foreground">{project.teamName}</p>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">
            {project.members.join(", ")}
          </p>
          <p className="text-xs text-muted-foreground">{project.workshopName}</p>
          {project.isSample ? (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
          ) : null}
          {project.awards.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {project.awards.map((a) => (
                <AwardBadge key={a.id} label={a.label} />
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </motion.article>
  );
}

export function BuilderEmptyState({
  className,
  filter,
}: {
  className?: string;
  filter?: string;
}) {
  const isAward = Boolean(filter && filter !== "all");
  return (
    <div
      className={cn(
        "rounded-md border border-dashed border-white/15 bg-card/40 px-6 py-16 text-center",
        className,
      )}
    >
      <h3 className="font-heading text-xl font-semibold">
        {isAward ? "No matching builders" : "No builders yet"}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {isAward
          ? "No consented team matches this filter yet. Awards appear after the workshop."
          : "Public profiles appear after teams receive a BOT ID and consent to publish. Mentors assign IDs like BOT-001 at check-in."}
      </p>
    </div>
  );
}

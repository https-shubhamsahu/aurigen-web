"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types/workshop-ecosystem";
import {
  builderFilters,
  type BuilderFilterId,
} from "@/content/builders/seed";
import { BuilderCard, BuilderEmptyState } from "@/components/builders/BuilderCard";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function matchesFilter(project: Project, filter: BuilderFilterId): boolean {
  if (filter === "samples") return Boolean(project.isSample);
  if (project.isSample) return false;
  if (filter === "all") return true;
  if (filter === "featured") return project.featured;
  if (filter === "winners") {
    return (
      project.status === "winner" ||
      project.awards.some((a) => a.category === "winner")
    );
  }
  return project.awards.some((a) => a.category === filter);
}

export function BuilderGallery({
  projects,
  samples,
}: {
  projects: Project[];
  samples: Project[];
}) {
  const [filter, setFilter] = useState<BuilderFilterId>("all");
  const pool = filter === "samples" ? samples : projects;

  const visible = useMemo(
    () => pool.filter((p) => matchesFilter(p, filter)),
    [pool, filter],
  );

  return (
    <div>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
        {builderFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => {
              setFilter(f.id);
              track("builder_filter_changed", { filter: f.id });
            }}
            className={cn(
              "min-h-10 shrink-0 rounded-md border px-3 py-2 text-sm transition-colors",
              filter === f.id
                ? "border-accent bg-accent text-accent-foreground"
                : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filter === "samples" ? (
        <p className="mb-6 text-sm text-muted-foreground">
          These cards are layout fixtures (BOT-901+). They are not workshop
          teams. Real profiles appear under All after consent.
        </p>
      ) : null}

      {visible.length === 0 ? (
        <BuilderEmptyState filter={filter} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <BuilderCard key={project.botId} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Film, ImageIcon } from "lucide-react";

type MediaKind = "video" | "image";

type BuildLabMediaPlaceholderProps = {
  kind?: MediaKind;
  label: string;
  className?: string;
  aspectClassName?: string;
};

/** Branded empty media slot until workshop assets are uploaded. */
export function BuildLabMediaPlaceholder({
  kind = "image",
  label,
  className,
  aspectClassName = "aspect-video",
}: BuildLabMediaPlaceholderProps) {
  const Icon = kind === "video" ? Film : ImageIcon;

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden border border-white/10 bg-zinc-950",
        aspectClassName,
        className,
      )}
      role="img"
      aria-label={label}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 grid-mesh"
        aria-hidden
      />
      <div className="relative z-10 flex max-w-[85%] flex-col items-center gap-3 px-4 text-center">
        <span className="flex size-11 items-center justify-center border border-white/10 bg-white/5 text-accent">
          <Icon className="size-5" aria-hidden />
        </span>
        <p className="text-sm font-medium text-foreground/90">{label}</p>
        <p className="text-xs text-muted-foreground">Media coming soon</p>
      </div>
    </div>
  );
}

type SkeletonProps = {
  className?: string;
  aspectClassName?: string;
};

export function BuildLabMediaSkeleton({
  className,
  aspectClassName = "aspect-video",
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse border border-white/10 bg-muted/60",
        aspectClassName,
        className,
      )}
      aria-hidden
    />
  );
}

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { AboutImage } from "@/content/about";

const aspectClass: Record<NonNullable<AboutImage["aspect"]>, string> = {
  hero: "aspect-[16/9]",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
};

type PhotoFrameProps = {
  image: AboutImage;
  className?: string;
  priority?: boolean;
  showCaption?: boolean;
};

/** Editorial photo slot. Paths live in `@/content/about`. */
export function PhotoFrame({
  image,
  className,
  priority = false,
  showCaption = true,
}: PhotoFrameProps) {
  const aspect = image.aspect ?? "landscape";

  return (
    <figure className={cn("group", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-zinc-950 border border-white/10",
          aspectClass[aspect]
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          className="object-cover"
          style={
            image.objectPosition
              ? { objectPosition: image.objectPosition }
              : undefined
          }
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        />
      </div>
      {showCaption && image.caption ? (
        <figcaption className="mt-3 flex min-w-0 items-baseline justify-between gap-4">
          <span className="min-w-0 break-words text-xs tracking-wide text-muted-foreground">
            {image.caption}
          </span>
          <span
            className="h-px max-w-16 flex-1 self-center bg-white/10"
            aria-hidden="true"
          />
        </figcaption>
      ) : null}
    </figure>
  );
}

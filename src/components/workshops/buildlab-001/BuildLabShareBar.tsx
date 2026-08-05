"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy, FileText, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildLabMedia,
  buildLabMeta,
  buildLabPath,
} from "@/content/workshops/buildlab-001";
import { track } from "@/lib/analytics";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export function BuildLabShareBar({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const [brochureReady, setBrochureReady] = useState(false);
  const pageUrl = absoluteUrl(buildLabPath);

  useEffect(() => {
    let cancelled = false;
    fetch(buildLabMedia.brochurePdf, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setBrochureReady(res.ok);
      })
      .catch(() => {
        if (!cancelled) setBrochureReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      track("workshop_copy_link", { workshop: "buildlab-001" });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  async function share() {
    track("workshop_share", { workshop: "buildlab-001" });
    if (navigator.share) {
      try {
        await navigator.share({
          title: buildLabMeta.title,
          text: buildLabMeta.subtitle,
          url: pageUrl,
        });
        return;
      } catch {
        /* fall through to copy */
      }
    }
    await copyLink();
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 border-t border-border bg-background/80 px-6 py-4",
        className,
      )}
    >
      <div className="mr-auto flex items-center gap-2 text-xs text-muted-foreground">
        <Link2 className="size-3.5 shrink-0" aria-hidden />
        <span className="hidden sm:inline">Share BuildLab #001</span>
      </div>

      {brochureReady ? (
        <a
          href={buildLabMedia.brochurePdf}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("workshop_brochure_download", { workshop: "buildlab-001" })
          }
        >
          <Button variant="outline" size="sm" className="h-10">
            <FileText className="size-4" aria-hidden />
            Brochure
          </Button>
        </a>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="h-10"
          disabled
          title="Brochure coming soon. Drop brochure.pdf into public/workshops/buildlab-001/"
        >
          <FileText className="size-4" aria-hidden />
          Brochure coming soon
        </Button>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-10"
        onClick={share}
      >
        <Share2 className="size-4" aria-hidden />
        Share
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-10"
        onClick={copyLink}
      >
        {copied ? (
          <Check className="size-4 text-emerald-400" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        )}
        {copied ? "Copied" : "Copy link"}
      </Button>

      <Link href="#register" className="hidden sm:inline-flex">
        <Button size="sm" className="h-10">
          Reserve Your Seat
        </Button>
      </Link>
    </div>
  );
}

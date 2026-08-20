"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  filename: string;
  language: string;
  code: string;
  className?: string;
};

export function CodeBlock({
  filename,
  language,
  code,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      track("code_copied", { filename, language });
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-white/10 bg-zinc-950",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs text-foreground">{filename}</p>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {language}
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onCopy}
          className="shrink-0"
        >
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="max-h-[28rem] overflow-auto p-4 text-[12px] leading-relaxed text-zinc-200 sm:text-[13px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

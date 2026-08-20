import { cn } from "@/lib/utils";

export function BotIdBadge({
  botId,
  className,
}: {
  botId: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-xs font-medium text-accent",
        className,
      )}
    >
      {botId.toUpperCase()}
    </span>
  );
}

export function AwardBadge({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] uppercase tracking-wide text-foreground",
        className,
      )}
    >
      {label}
    </span>
  );
}

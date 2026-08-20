export function DemoModeBanner({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div
      role="status"
      className="rounded-md border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground"
    >
      <p className="font-heading font-semibold">{title}</p>
      <p className="mt-1 leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

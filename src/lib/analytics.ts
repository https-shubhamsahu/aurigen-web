/**
 * Safe analytics helpers. No-ops when gtag / posthog / dataLayer are absent.
 */

type TrackProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export function track(event: string, props: TrackProps = {}): void {
  if (typeof window === "undefined") return;

  const clean = Object.fromEntries(
    Object.entries(props).filter(([, v]) => v !== undefined),
  );

  try {
    window.gtag?.("event", event, clean);
  } catch {
    /* ignore */
  }

  try {
    window.dataLayer?.push({ event, ...clean });
  } catch {
    /* ignore */
  }

  try {
    window.posthog?.capture(event, clean);
  } catch {
    /* ignore */
  }
}

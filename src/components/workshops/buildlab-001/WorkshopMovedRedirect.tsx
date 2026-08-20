"use client";

import { useEffect } from "react";
import Link from "next/link";
import { WORKSHOP_PATH } from "@/lib/workshop-config";

/**
 * Old registration URL. Static Pages has no server redirect, so this
 * client page points people at the during-workshop hub.
 */
export function WorkshopMovedRedirect() {
  useEffect(() => {
    window.location.replace(WORKSHOP_PATH);
  }, []);

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
        This page moved
      </p>
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight">
        Workshop hub
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Website registration is not available. Teams already signed up through
        the college Google Form. Continue to the during-workshop hub for
        schedule, BOT IDs, code, vlog, and social kit.
      </p>
      <p className="mt-8">
        <Link href={WORKSHOP_PATH} className="text-accent hover:underline">
          Open /workshops/esp32-walking-robot/
        </Link>
      </p>
    </section>
  );
}

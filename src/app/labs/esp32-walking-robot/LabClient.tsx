"use client";

import { useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { AboutHeader } from "@/components/about/AboutHeader";
import { CodeModuleCard, LabNav } from "@/components/labs/CodeModuleCard";
import { WorkshopSubnav } from "@/components/workshops/esp32-walking-robot/WorkshopSubnav";
import { codeModules, labSections } from "@/content/labs/esp32-walking-robot";
import { track } from "@/lib/analytics";
import { WORKSHOP_PATH } from "@/lib/workshop-config";

export function LabClient() {
  useEffect(() => {
    track("code_library_opened", { lab: "esp32-walking-robot" });
  }, []);

  return (
    <>
      <AboutHeader />
      <div className="pt-16 md:pt-20">
        <WorkshopSubnav />
        <main className="min-h-screen">
        <section className="border-b border-border pt-10 pb-12 md:pt-14">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
              Aurigen Labs
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              ESP32 Walking Robot Code
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              Progressive modules for the ESP32-C3 walking robot. Servos are driven
              directly by the ESP32-C3. Workshop by Robotics & Automation Club, TSEC.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <Link href={WORKSHOP_PATH} className="text-accent hover:underline">
                Back to workshop hub
              </Link>
            </p>

            <div className="mt-8 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {codeModules.map((m) => (
                <a
                  key={m.id}
                  href={`#module-${m.id}`}
                  className="min-h-10 shrink-0 rounded-md border border-white/10 px-3 py-2 font-mono text-xs text-accent"
                >
                  {m.id} {m.title}
                </a>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {labSections.map((section) => (
                <div
                  key={section.id}
                  className="rounded-md border border-white/10 bg-card p-4"
                >
                  <h2 className="font-heading font-semibold">{section.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {section.detail}
                  </p>
                  {section.tier === "community" ? (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Empty for now. Team contributions will land here.
                    </p>
                  ) : (
                    <p className="mt-3 font-mono text-xs text-accent">
                      {
                        codeModules.filter((m) => m.tier === section.tier)
                          .length
                      }{" "}
                      modules
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[220px_1fr] lg:px-8">
          <LabNav modules={codeModules} />
          <div>
            {codeModules.map((module, index) => (
              <CodeModuleCard key={module.id} module={module} index={index} />
            ))}
          </div>
        </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

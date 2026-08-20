"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { CodeModule, CodeModuleTier } from "@/types/workshop-ecosystem";
import { CodeBlock } from "@/components/labs/CodeBlock";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const tierLabel: Record<CodeModuleTier, string> = {
  "start-here": "Start Here",
  workshop: "Workshop",
  challenge: "Challenge",
  community: "Community",
};

export function CodeModuleCard({
  module,
  index = 0,
}: {
  module: CodeModule;
  index?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      id={`module-${module.id}`}
      className="scroll-mt-28 border-b border-white/10 py-10 md:py-12"
      {...(reduced ? {} : fadeUp)}
      transition={stagger(index, 0.04)}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-accent">
          {module.id.padStart(2, "0")}
        </span>
        <span className="rounded-sm border border-white/10 px-2 py-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
          {tierLabel[module.tier]}
        </span>
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {module.difficulty}
        </span>
        {module.badge ? (
          <span className="rounded-sm border border-accent/30 px-2 py-0.5 text-[11px] uppercase tracking-wide text-accent">
            {module.badge}
          </span>
        ) : null}
      </div>

      <h3 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
        {module.title}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {module.objective}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Section title="What you will learn">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {module.learn.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
          <Section title="Wiring / requirements">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {module.wiring.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
          <Section title="Explanation">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {module.explanation}
            </p>
          </Section>
          <Section title="Expected result">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {module.expectedResult}
            </p>
          </Section>
          <Section title="Common mistakes">
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {module.commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
          {module.nextStep ? (
            <Section title="Next step">
              <p className="text-sm text-muted-foreground">{module.nextStep}</p>
            </Section>
          ) : null}
        </div>

        <div className="space-y-4">
          {module.code.map((snippet) => (
            <CodeBlock
              key={snippet.filename}
              filename={snippet.filename}
              language={snippet.language}
              code={snippet.code}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <h4 className="mb-2 text-xs font-heading font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h4>
      {children}
    </div>
  );
}

export function LabNav({ modules }: { modules: CodeModule[] }) {
  return (
    <nav
      aria-label="Module list"
      className="sticky top-24 hidden max-h-[70vh] overflow-auto rounded-md border border-white/10 bg-card/60 p-4 lg:block"
    >
      <p className="mb-3 text-xs font-heading uppercase tracking-wider text-muted-foreground">
        Modules
      </p>
      <ul className="space-y-1">
        <li>
          <Link
            href="#hardware"
            className="flex min-h-9 items-center gap-2 rounded-sm px-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <span className="font-mono text-[11px] text-accent">HW</span>
            <span className="truncate">Hardware</span>
          </Link>
        </li>
        {modules.map((m) => (
          <li key={m.id}>
            <Link
              href={`#module-${m.id}`}
              className="flex min-h-9 items-center gap-2 rounded-sm px-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <span className="font-mono text-[11px] text-accent">{m.id}</span>
              <span className="truncate">{m.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

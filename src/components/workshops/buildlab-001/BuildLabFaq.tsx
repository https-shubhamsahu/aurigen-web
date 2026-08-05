"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildLabFaq } from "@/content/workshops/buildlab-001";
import { fadeUp } from "@/lib/motion";

export function BuildLabFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="buildlab-faq-heading"
      className="scroll-mt-28 border-t border-border bg-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Clear answers
          </p>
          <h2
            id="buildlab-faq-heading"
            className="text-3xl font-bold leading-[1.1] md:text-5xl"
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <Accordion className="mx-auto max-w-3xl border-t border-white/10">
          {buildLabFaq.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question.replace(/\s+/g, "-").toLowerCase()}
              className="border-b border-white/10"
            >
              <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline md:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground md:text-[17px]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

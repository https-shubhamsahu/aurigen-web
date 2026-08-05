"use client";

import { motion } from "framer-motion";
import { aboutFaq } from "@/content/faq";
import { fadeUp, stagger } from "@/lib/motion";

export function AboutFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-border bg-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10 max-w-2xl md:mb-14 lg:mb-20">
          <p className="mb-4 text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Clear answers
          </p>
          <h2
            id="faq-heading"
            className="text-3xl font-bold leading-[1.1] md:text-5xl"
          >
            Questions people ask about Aurigen
          </h2>
        </motion.div>

        <dl className="mx-auto max-w-3xl space-y-0">
          {aboutFaq.map((item, i) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={stagger(i, 0.05)}
              className="border-t border-white/10 py-6 md:py-8 lg:py-10"
            >
              <dt>
                <h3 className="text-lg font-bold leading-snug md:text-xl">
                  {item.question}
                </h3>
              </dt>
              <dd className="mt-3 text-base leading-relaxed text-muted-foreground md:text-[17px]">
                {item.answer}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

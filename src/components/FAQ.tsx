"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      id: "item-1",
      q: "How is Aurigen Labs different from a standard coding camp or computer tuition class?",
      a: "Coding camps often teach syntax in isolation on a screen. Aurigen is a systems platform. Students write algorithms that compile and control physical hardware (sensors, motor drivers, microprocessors) alongside live AI models. We do not prep for generic exams. We teach product engineering fundamentals.",
    },
    {
      id: "item-2",
      q: "What hardware is provided with the subscription tracks?",
      a: "Every learning track pairs with a specific Aurigen Hardware Kit: microcontrollers, motor shields, sensors, and chassis components. The hardware plugs into our cloud IDE, so students skip manual driver installs.",
    },
    {
      id: "item-3",
      q: "Is prior programming experience required?",
      a: "No. The curriculum builds progressively. Level 1 introduces foundational logic with visual block mapping. Levels 2 and 3 move students into micro-Python and training neural network models.",
    },
    {
      id: "item-4",
      q: "How does school accreditation work?",
      a: "Institutional curricula align with international STEM frameworks. When a school deploys an Aurigen Lab, we supply lesson syllabi, teacher dashboards, grading rubrics, and direct training for local faculty.",
    },
  ];

  return (
    <section className="py-24 border-t border-border" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider block mb-3 font-heading">
            Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Common questions
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Details for parents and schools on how Aurigen works.
          </p>
        </div>

        {/* Accordion Component */}
        <Accordion className="w-full flex flex-col gap-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-border bg-[#121214]/40 px-6 rounded-lg overflow-hidden transition-all hover:border-primary/25"
            >
              <AccordionTrigger className="text-left font-heading font-medium py-5 text-sm md:text-base text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 border-t border-border/40 pt-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

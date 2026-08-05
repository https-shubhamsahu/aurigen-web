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
      a: "Traditional coding camps teach programming syntax in isolation on a screen. Aurigen is a comprehensive systems platform. Students write algorithms that compile and directly control physical hardware (sensors, motor driver boards, microprocessors) combined with live AI models. We do not prepare students for generic exams; we teach them the fundamentals of product engineering.",
    },
    {
      id: "item-2",
      q: "What hardware is provided with the subscription tracks?",
      a: "Every learning track is paired with a specific Aurigen Hardware Kit containing microcontrollers, motor shields, sensors, and chassis components. The hardware integrates plug-and-play with our cloud IDE, removing the friction of manual driver installations.",
    },
    {
      id: "item-3",
      q: "Is prior programming experience required?",
      a: "No. Our curriculum is built progressively. Level 1 introduces foundational logic using visual block mapping. Levels 2 and 3 smoothly transition students to writing micro-Python syntax and training neural network models.",
    },
    {
      id: "item-4",
      q: "How does school accreditation work?",
      a: "Our institutional curriculums are fully aligned with international STEM frameworks. When a school deploys an Aurigen Lab, we supply complete lesson syllabi, teacher dashboards, grading rubrics, and direct training to qualify local faculty.",
    },
  ];

  return (
    <section className="py-24 border-t border-border" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider block mb-3 font-heading">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Common Inquiries
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Got questions about how Aurigen operates? We have compiled details addressing parent and school concerns.
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

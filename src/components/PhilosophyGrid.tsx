"use client";

import { Ban, ShieldAlert, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface PhilosophyItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function PhilosophyGrid() {
  const cards: PhilosophyItem[] = [
    {
      icon: <Ban className="h-6 w-6" />,
      title: "Not a Tuition Class",
      desc: "We do not drill syllabus questions or help finish school homework. Our goal is to build deep conceptual comprehension through creative problem-solving.",
    },
    {
      icon: <ShieldAlert className="h-6 w-6" />,
      title: "Not a Coaching Institute",
      desc: "Rote memorization and test prep limit potential. We teach students to write real algorithms, design schematics, and program spatial kinematics.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Premium AI Platform",
      desc: "A specialized platform combining curated hardware kits with a cloud-native IDE built for younger creators.",
    },
  ];

  return (
    <section className="py-24 bg-[#0b0b0c] border-t border-border" id="philosophy">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider block mb-3 font-heading">
            High-Agency Mindset
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            Engineering, re-engineered for builders
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Traditional institutions focus on repeating answers. Aurigen focuses
            on asking the right questions and building the answers physically.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background border border-border hover:border-primary/40 rounded-xl p-8 lg:p-10 shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_10px_30px_rgba(255,214,0,0.03)] group"
            >
              <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-border flex items-center justify-center text-primary mb-6 transition-colors group-hover:border-primary/20">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading text-foreground">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

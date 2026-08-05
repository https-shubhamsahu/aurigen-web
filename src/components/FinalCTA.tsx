"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const roles = ["Student", "Parent", "School", "Investor", "Other"] as const;

export default function FinalCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("Parent");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setDone(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="border-t border-border bg-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
          <motion.div {...fadeUp} className="lg:col-span-5">
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              Apply
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.15] mb-5">
              Tell us who you are. Build with us.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Student, parent, school leader, or investor: share a few details.
              We will follow up with the right next step.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-accent font-bold">·</span>
                Students and parents: track fit and enrollment
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">·</span>
                Schools: partner on a lab
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">·</span>
                Investors: request the brief
              </li>
            </ul>
          </motion.div>

          <motion.div {...fadeUp} className="lg:col-span-7">
            {done ? (
              <div
                className="flex flex-col items-start gap-4 border border-white/10 bg-background p-6 sm:p-10"
                role="status"
              >
                <div className="h-9 w-9 border border-accent/40 bg-accent/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-accent" />
                </div>
                <h3 className="text-xl font-bold">We received your message.</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Someone from the Aurigen team will reach out shortly.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setDone(false)}
                  className="mt-2"
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 border border-white/10 bg-background p-6 sm:p-8 md:p-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="h-11 bg-zinc-950 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="h-11 bg-zinc-950 border-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">I am a</Label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="flex h-11 w-full rounded-md border border-white/10 bg-zinc-950 text-foreground px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r} className="bg-zinc-950 text-foreground">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What do you want to build, partner on, or review?"
                    className="flex w-full rounded-md border border-white/10 bg-zinc-950 text-foreground px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 resize-y min-h-[100px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="group h-12 w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Build with us
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

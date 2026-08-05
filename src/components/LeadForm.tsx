"use client";

import { useState } from "react";
import { ShieldCheck, Wrench, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [role, setRole] = useState("Principal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ status: "idle" | "success" | "error"; text: string }>({
    status: "idle",
    text: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ status: "idle", text: "" });

    // Mock network request
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback({
        status: "success",
        text: `Demo reserved successfully! Thank you, Dr. ${name.split(" ").pop()}. A curriculum architect will email you at ${email} to coordinate space designs for ${school}.`,
      });
      // Clear fields
      setName("");
      setEmail("");
      setSchool("");
    }, 1500);
  };

  return (
    <section className="py-24 bg-[#0b0b0c] border-t border-border" id="contact">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Benefit List */}
        <div className="flex flex-col items-start text-left">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider block mb-3 font-heading">
            Partner with Aurigen
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading leading-tight">
            Bring AI and robotics labs to your institution
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-10">
            Deploy AI, Robotics, and IoT laboratories. We supply the hardware,
            licensing, curriculum blueprints, and teacher-enablement support.
          </p>

          <div className="flex gap-5 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/15 flex items-center justify-center text-primary flex-shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-base font-bold font-heading mb-1 text-foreground">
                Fully Accredited STEM Blueprint
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Curriculums optimized to match global engineering educational standards.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/15 flex items-center justify-center text-primary flex-shrink-0">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-base font-bold font-heading mb-1 text-foreground">
                Full hardware provision
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No sourcing headaches. We design and deliver custom component packages for every classroom seat.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="bg-card border border-border rounded-xl p-8 md:p-10 shadow-2xl">
          <h3 className="text-2xl font-bold mb-2 font-heading text-foreground">
            Request Lab Details & Demo
          </h3>
          <p className="text-xs text-muted-foreground mb-8">
            Provide your information below. Our curriculum architects will reach out within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 text-left">
              <Label htmlFor="lead-name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Your Name
              </Label>
              <Input
                id="lead-name"
                type="text"
                placeholder="E.g., Dr. Aris Carter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11 bg-black/20 border-border focus-visible:ring-primary rounded-md text-sm"
              />
            </div>

            <div className="flex flex-col gap-2 text-left">
              <Label htmlFor="lead-email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Institutional Email
              </Label>
              <Input
                id="lead-email"
                type="email"
                placeholder="you@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-black/20 border-border focus-visible:ring-primary rounded-md text-sm"
              />
            </div>

            <div className="flex flex-col gap-2 text-left">
              <Label htmlFor="lead-school" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                School/College Name
              </Label>
              <Input
                id="lead-school"
                type="text"
                placeholder="E.g., Helix Academy"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
                className="h-11 bg-black/20 border-border focus-visible:ring-primary rounded-md text-sm"
              />
            </div>

            <div className="flex flex-col gap-2 text-left">
              <Label htmlFor="lead-role" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Your Role
              </Label>
              <select
                id="lead-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-11 bg-black/20 border border-border text-foreground rounded-md px-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="Principal">Principal / Director</option>
                <option value="Academic Coordinator">Academic Coordinator</option>
                <option value="HOD">Head of Department (ICT/Science)</option>
                <option value="Parent">Parent</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 bg-primary text-primary-foreground hover:bg-primary/95 rounded-md text-sm font-bold font-heading mt-2 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,214,0,0.1)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Transmitting Request...</span>
                </>
              ) : (
                <>
                  <span>Submit Request</span>
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>

            {feedback.status !== "idle" && (
              <p
                className={`text-xs font-mono text-center mt-3 leading-relaxed ${
                  feedback.status === "success" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {feedback.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

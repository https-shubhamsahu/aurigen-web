"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppHref } from "@/lib/buildlab-registration";
import { track } from "@/lib/analytics";

export function BuildLabWhatsApp() {
  return (
    <a
      href={getWhatsAppHref()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("workshop_whatsapp_click", { workshop: "buildlab-001" })}
      className="fixed right-4 bottom-20 z-30 flex size-12 items-center justify-center rounded-full border border-white/10 bg-[#25D366] text-[#0A0A0A] shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:bottom-6 lg:right-6 lg:size-14"
      aria-label="Chat on WhatsApp about BuildLab"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}

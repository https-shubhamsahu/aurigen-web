/**
 * Legacy /workshops/buildlab-001/ URL.
 * Registration is off this site. Point old links at the workshop hub
 * so GitHub Pages does not 404.
 */

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AboutHeader } from "@/components/about/AboutHeader";
import { WorkshopMovedRedirect } from "@/components/workshops/buildlab-001/WorkshopMovedRedirect";
import { WORKSHOP_PATH } from "@/lib/workshop-config";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "This page moved | ESP32 Walking Robot Workshop",
  description:
    "Workshop registration is not on this site. Open the ESP32 Walking Robot hub for schedule, BOT IDs, code, and vlog.",
  robots: { index: false, follow: true },
  alternates: { canonical: WORKSHOP_PATH },
  openGraph: {
    title: "This page moved | ESP32 Walking Robot Workshop",
    description:
      "Open the during-workshop hub. Teams already signed up through the college Google Form.",
    url: absoluteUrl(WORKSHOP_PATH),
    siteName: SITE_NAME,
  },
};

export default function BuildLab001MovedPage() {
  return (
    <>
      <AboutHeader />
      <div className="pt-16 md:pt-20">
        <main>
          <WorkshopMovedRedirect />
        </main>
      </div>
      <Footer />
    </>
  );
}

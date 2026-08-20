import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AboutHeader } from "@/components/about/AboutHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChallengeView } from "@/components/workshops/esp32-walking-robot/ChallengeView";
import { WorkshopSubnav } from "@/components/workshops/esp32-walking-robot/WorkshopSubnav";
import { CHALLENGE_PATH } from "@/lib/workshop-config";
import { OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "7-Day ESP32 Robot Challenge",
  description:
    "Seven daily robot hacks after the ESP32 Walking Robot Workshop. Track progress by BOT ID and earn a Robot Builder Score.",
  alternates: { canonical: CHALLENGE_PATH },
  openGraph: {
    title: "7-Day ESP32 Robot Challenge",
    description: "7 Days. 7 Robot Hacks. Keep building after the workshop.",
    type: "website",
    url: absoluteUrl(CHALLENGE_PATH),
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "7-Day ESP32 Robot Challenge",
    description: "7 Days. 7 Robot Hacks.",
    images: [OG_IMAGE.url],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "7-Day ESP32 Robot Challenge",
  url: absoluteUrl(CHALLENGE_PATH),
};

export default function ChallengePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <AboutHeader />
      <div className="pt-16 md:pt-20">
        <WorkshopSubnav />
        <main>
          <ChallengeView />
        </main>
      </div>
      <Footer />
    </>
  );
}

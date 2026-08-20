import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AboutHeader } from "@/components/about/AboutHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { SocialKitView } from "@/components/workshops/esp32-walking-robot/SocialKitView";
import { WorkshopSubnav } from "@/components/workshops/esp32-walking-robot/WorkshopSubnav";
import { SOCIAL_PATH } from "@/lib/workshop-config";
import { OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "ESP32 Walking Robot Social Kit",
  description:
    "Instagram story templates and LinkedIn captions for the ESP32 Walking Robot Workshop by Robotics & Automation Club, TSEC.",
  alternates: { canonical: SOCIAL_PATH },
  openGraph: {
    title: "ESP32 Walking Robot Social Kit",
    description: "Generate story cards and captions with accurate TSEC attribution.",
    type: "website",
    url: absoluteUrl(SOCIAL_PATH),
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
    title: "ESP32 Walking Robot Social Kit",
    description: "Story templates and LinkedIn captions.",
    images: [OG_IMAGE.url],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ESP32 Walking Robot Social Kit",
  url: absoluteUrl(SOCIAL_PATH),
};

export default function SocialKitPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <AboutHeader />
      <div className="pt-16 md:pt-20">
        <WorkshopSubnav />
        <main>
          <SocialKitView />
        </main>
      </div>
      <Footer />
    </>
  );
}

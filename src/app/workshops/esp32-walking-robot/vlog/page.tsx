import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AboutHeader } from "@/components/about/AboutHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { VlogChallengeView } from "@/components/workshops/esp32-walking-robot/VlogChallengeView";
import { WorkshopSubnav } from "@/components/workshops/esp32-walking-robot/WorkshopSubnav";
import { vlogMeta } from "@/content/workshops/esp32-walking-robot/vlog";
import { VLOG_PATH } from "@/lib/workshop-config";
import { OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: vlogMeta.title,
  description: vlogMeta.description,
  alternates: { canonical: VLOG_PATH },
  openGraph: {
    title: vlogMeta.title,
    description: vlogMeta.description,
    type: "website",
    url: absoluteUrl(VLOG_PATH),
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
    title: vlogMeta.title,
    description: vlogMeta.description,
    images: [OG_IMAGE.url],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: vlogMeta.title,
  description: vlogMeta.description,
  url: absoluteUrl(VLOG_PATH),
};

export default function VlogPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <AboutHeader />
      <div className="pt-16 md:pt-20">
        <WorkshopSubnav />
        <main>
          <VlogChallengeView />
        </main>
      </div>
      <Footer />
    </>
  );
}

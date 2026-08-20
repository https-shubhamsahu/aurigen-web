import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AboutHeader } from "@/components/about/AboutHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { BuilderGallery } from "@/components/builders/BuilderGallery";
import { WorkshopSubnav } from "@/components/workshops/esp32-walking-robot/WorkshopSubnav";
import {
  listLayoutSampleBuilders,
  listPublicBuilders,
} from "@/content/builders/seed";
import { BUILDERS_PATH } from "@/lib/workshop-config";
import { OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "ESP32 Robot Builders | Project Showcase",
  description:
    "Public ESP32 walking robot builder profiles from the Robotics & Automation Club, TSEC workshop. Featured teams, hacks, and awards.",
  alternates: { canonical: BUILDERS_PATH },
  openGraph: {
    title: "ESP32 Robot Builders | Project Showcase",
    description:
      "Public ESP32 walking robot builder profiles. Real teams appear after the Robotics & Automation Club, TSEC workshop with consent.",
    type: "website",
    url: absoluteUrl(BUILDERS_PATH),
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
    title: "ESP32 Robot Builders | Project Showcase",
    description: "ESP32 walking robot builder showcase.",
    images: [OG_IMAGE.url],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ESP32 Robot Builders",
  description: "Public builder profiles for ESP32 walking robots.",
  url: absoluteUrl(BUILDERS_PATH),
};

export default function BuildersPage() {
  const projects = listPublicBuilders();
  const samples = listLayoutSampleBuilders();

  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <AboutHeader />
      <div className="pt-16 md:pt-20">
        <WorkshopSubnav />
        <main className="min-h-screen">
        <section className="border-b border-border pt-10 pb-12 md:pt-14">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
              Builders
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              ESP32 Robot Builders
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground">
              Public profiles only. No phones, emails, or private Drive links.
              Real teams appear here after consent. Layout samples live behind
              the Layout samples filter and use BOT-901+.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Need a BOT ID? Mentors assign IDs like BOT-001 during check-in.
              Registration does not create a BOT ID. Workshop organized by
              Robotics & Automation Club, TSEC.
            </p>
          </div>
        </section>
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <BuilderGallery projects={projects} samples={samples} />
          </div>
        </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

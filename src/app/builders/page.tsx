import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AboutHeader } from "@/components/about/AboutHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { BuilderGallery } from "@/components/builders/BuilderGallery";
import { WorkshopSubnav } from "@/components/workshops/esp32-walking-robot/WorkshopSubnav";
import { listPublicBuilders } from "@/content/builders/seed";
import { BUILDERS_PATH } from "@/lib/workshop-config";
import { OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "ESP32 Robot Builders | Find your BOT ID",
  description:
    "Workshop teams from the ESP32 Walking Robot workshop organized by Robotics & Automation Club, TSEC. Search by team name to find your BOT ID.",
  alternates: { canonical: BUILDERS_PATH },
  openGraph: {
    title: "ESP32 Robot Builders | Find your BOT ID",
    description:
      "Workshop teams from the Robotics & Automation Club, TSEC ESP32 walking robot workshop. Find your BOT ID.",
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
    title: "ESP32 Robot Builders | Find your BOT ID",
    description:
      "Workshop teams from the Robotics & Automation Club, TSEC ESP32 walking robot workshop.",
    images: [OG_IMAGE.url],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ESP32 Robot Builders",
  description:
    "Workshop teams from the ESP32 Walking Robot workshop organized by Robotics & Automation Club, TSEC.",
  url: absoluteUrl(BUILDERS_PATH),
};

export default function BuildersPage() {
  const projects = listPublicBuilders();

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
              Find your team and BOT ID. Public profiles only: first names, no
              phones or emails. These 14 teams signed up through the college
              Google Form. This site does not take registrations.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Search by team name or BOT-001 style ID. Workshop organized by
              Robotics & Automation Club, TSEC. Aurigen is not the organizer.
            </p>
          </div>
        </section>
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <BuilderGallery projects={projects} />
          </div>
        </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

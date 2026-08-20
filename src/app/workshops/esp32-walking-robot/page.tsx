import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AboutHeader } from "@/components/about/AboutHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkshopHubView } from "@/components/workshops/esp32-walking-robot/WorkshopHubView";
import { WorkshopSubnav } from "@/components/workshops/esp32-walking-robot/WorkshopSubnav";
import {
  workshop,
  workshopFaq,
  workshopMeta,
  WORKSHOP_PATH,
} from "@/content/workshops/esp32-walking-robot";
import { OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: workshopMeta.title,
  description: workshopMeta.description,
  keywords: [
    "ESP32",
    "walking robot",
    "TSEC",
    "Robotics & Automation Club",
    "ESP32-C3",
    "robotics workshop",
  ],
  alternates: { canonical: WORKSHOP_PATH },
  openGraph: {
    title: workshopMeta.title,
    description: workshopMeta.ogDescription,
    type: "website",
    url: absoluteUrl(WORKSHOP_PATH),
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
    title: workshopMeta.title,
    description: workshopMeta.ogDescription,
    images: [OG_IMAGE.url],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: workshopMeta.title,
  description: workshopMeta.description,
  url: absoluteUrl(WORKSHOP_PATH),
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  },
  about: {
    "@type": "Organization",
    name: workshop.organizerShort,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: workshopFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: workshop.name,
  description: workshopMeta.description,
  startDate: "2026-08-21T13:00:00+05:30",
  endDate: "2026-08-22T16:30:00+05:30",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  organizer: {
    "@type": "Organization",
    name: workshop.organizer,
  },
  location: {
    "@type": "Place",
    name: workshop.college,
  },
  url: absoluteUrl(WORKSHOP_PATH),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: workshop.name,
      item: absoluteUrl(WORKSHOP_PATH),
    },
  ],
};

export default function Esp32WalkingRobotHubPage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd, faqJsonLd, eventJsonLd, breadcrumbJsonLd]} />
      <AboutHeader />
      <div className="pt-16 md:pt-20">
        <WorkshopSubnav />
        <main>
          <WorkshopHubView />
        <section className="border-t border-border py-14 md:py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold">FAQ</h2>
            <dl className="mt-8 space-y-6">
              {workshopFaq.map((item) => (
                <div key={item.question}>
                  <dt className="font-heading font-semibold">{item.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

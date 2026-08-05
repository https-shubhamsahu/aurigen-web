/**
 * Aurigen BuildLab #001 workshop page.
 * Copy and media paths live in `@/content/workshops/buildlab-001`.
 */

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutHeader } from "@/components/about/AboutHeader";
import { BuildLabHero } from "@/components/workshops/buildlab-001/BuildLabHero";
import { BuildLabSectionNav } from "@/components/workshops/buildlab-001/BuildLabSectionNav";
import { BuildLabShareBar } from "@/components/workshops/buildlab-001/BuildLabShareBar";
import { BuildLabWhatYouBuild } from "@/components/workshops/buildlab-001/BuildLabWhatYouBuild";
import { BuildLabWhatYouLearn } from "@/components/workshops/buildlab-001/BuildLabWhatYouLearn";
import { BuildLabExperience } from "@/components/workshops/buildlab-001/BuildLabExperience";
import { BuildLabGallery } from "@/components/workshops/buildlab-001/BuildLabGallery";
import { BuildLabAudience } from "@/components/workshops/buildlab-001/BuildLabAudience";
import { BuildLabIncluded } from "@/components/workshops/buildlab-001/BuildLabIncluded";
import { BuildLabMentors } from "@/components/workshops/buildlab-001/BuildLabMentors";
import { BuildLabFaq } from "@/components/workshops/buildlab-001/BuildLabFaq";
import { BuildLabFinalCta } from "@/components/workshops/buildlab-001/BuildLabFinalCta";
import { BuildLabStickyCta } from "@/components/workshops/buildlab-001/BuildLabStickyCta";
import { BuildLabWhatsApp } from "@/components/workshops/buildlab-001/BuildLabWhatsApp";
import {
  buildLabFaq,
  buildLabMeta,
  buildLabMentors,
  buildLabPath,
} from "@/content/workshops/buildlab-001";
import { OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `${buildLabMeta.title} | ${buildLabMeta.name}`,
  description: buildLabMeta.description,
  keywords: [
    "Aurigen",
    "BuildLab",
    "ESP32",
    "walking robot",
    "robotics workshop",
    "Arduino",
    "hands-on robotics",
  ],
  alternates: {
    canonical: buildLabPath,
  },
  openGraph: {
    title: `${buildLabMeta.title} | ${buildLabMeta.name}`,
    description: buildLabMeta.subtitle,
    type: "website",
    url: absoluteUrl(buildLabPath),
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
    title: `${buildLabMeta.title} | ${SITE_NAME}`,
    description: buildLabMeta.subtitle,
    images: [OG_IMAGE.url],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${buildLabMeta.name}: ${buildLabMeta.title}`,
  description: buildLabMeta.description,
  url: absoluteUrl(buildLabPath),
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  },
  about: {
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  },
};

const programJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  name: buildLabMeta.name,
  alternateName: buildLabMeta.title,
  description: buildLabMeta.description,
  url: absoluteUrl(buildLabPath),
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  },
  occupationalCategory: "Robotics Engineering",
  educationalProgramMode: "onsite",
  programPrerequisites: "No prior robotics experience required. Laptop recommended.",
  teaches: [
    "ESP32 Programming",
    "Arduino IDE",
    "Robot Assembly",
    "Servo Motors",
    "Embedded Systems",
  ],
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
      name: "BuildLab #001",
      item: absoluteUrl(buildLabPath),
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: buildLabFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const mentorJsonLd = buildLabMentors.map((mentor) => {
  const sameAs = [mentor.links.github, mentor.links.linkedin, mentor.links.instagram].filter(
    (url): url is string => Boolean(url),
  );
  const email = mentor.links.email?.replace(/^mailto:/i, "");
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: mentor.name,
    jobTitle: mentor.role,
    image: absoluteUrl(mentor.portrait.src),
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    ...(email ? { email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
});

export default function BuildLab001Page() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-background pb-20 lg:pb-0">
      <JsonLd
        data={[
          webPageJsonLd,
          programJsonLd,
          breadcrumbJsonLd,
          faqJsonLd,
          ...mentorJsonLd,
        ]}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <AboutHeader />
      <BuildLabSectionNav />
      <main id="main" className="flex-grow">
        <BuildLabHero />
        <BuildLabShareBar />
        <BuildLabWhatYouBuild />
        <BuildLabWhatYouLearn />
        <BuildLabExperience />
        <BuildLabGallery />
        <BuildLabAudience />
        <BuildLabIncluded />
        <BuildLabMentors />
        <BuildLabFaq />
        <BuildLabFinalCta />
      </main>
      <Footer />
      <BuildLabStickyCta />
      <BuildLabWhatsApp />
    </div>
  );
}

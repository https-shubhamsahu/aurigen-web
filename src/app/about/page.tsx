/**
 * About page.
 * Story and media live in `@/content/about` so copy and photos can be swapped
 * without changing section layout.
 */

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutHeader } from "@/components/about/AboutHeader";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutWhat } from "@/components/about/AboutWhat";
import { AboutWhy } from "@/components/about/AboutWhy";
import { AboutLab } from "@/components/about/AboutLab";
import { AboutFounders } from "@/components/about/AboutFounders";
import { AboutAcknowledgement } from "@/components/about/AboutAcknowledgement";
import { AboutRoots } from "@/components/about/AboutRoots";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutFaq } from "@/components/about/AboutFaq";
import { AboutNext } from "@/components/about/AboutNext";
import { AboutFinalCta } from "@/components/about/AboutFinalCta";
import { aboutFounders } from "@/content/about";
import { aboutFaq } from "@/content/faq";
import { OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

function founderSameAs(links: (typeof aboutFounders)[number]["links"]): string[] {
  return [links.github, links.linkedin, links.x, links.instagram].filter(
    (url): url is string => Boolean(url),
  );
}

function founderEmail(links: (typeof aboutFounders)[number]["links"]): string | undefined {
  if (!links.email) return undefined;
  return links.email.replace(/^mailto:/i, "");
}

const aboutDescription =
  "What is Aurigen? An engineering institution that forges AI engineers, robotics innovators, and builders. Started at Thakur Shyamnarayan Engineering College and the Robotics & Automation Club.";

export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title: `About ${SITE_NAME} | Engineering institution for AI and robotics builders`,
    description: aboutDescription,
    type: "website",
    url: absoluteUrl("/about/"),
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
    title: `About ${SITE_NAME}`,
    description: aboutDescription,
    images: [OG_IMAGE.url],
  },
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${SITE_NAME}`,
  description: aboutDescription,
  url: absoluteUrl("/about/"),
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
      name: "About",
      item: absoluteUrl("/about/"),
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aboutFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const founderJsonLd = aboutFounders.map((founder) => {
  const sameAs = founderSameAs(founder.links);
  const email = founderEmail(founder.links);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.role,
    description: founder.intro,
    image: absoluteUrl(founder.portrait.src),
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    ...(email ? { email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
});

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd
        data={[aboutPageJsonLd, breadcrumbJsonLd, faqJsonLd, ...founderJsonLd]}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <AboutHeader />
      <main id="main" className="flex-grow">
        <AboutHero />
        <AboutWhat />
        <AboutWhy />
        <AboutLab />
        <AboutFounders />
        <AboutAcknowledgement />
        <AboutRoots />
        <AboutPrinciples />
        <AboutFaq />
        <AboutNext />
        <AboutFinalCta />
      </main>
      <Footer />
    </div>
  );
}

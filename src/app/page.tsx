import type { Metadata } from "next";
import HeroSection from "@/components/blocks/hero-section-5";
import { AboutLab } from "@/components/about/AboutLab";
import WhyExists from "@/components/WhyExists";
import ProblemSection from "@/components/ProblemSection";
import Philosophy from "@/components/Philosophy";
import LearningJourney from "@/components/LearningJourney";
import Programs from "@/components/Programs";
import Projects from "@/components/Projects";
import ForParents from "@/components/ForParents";
import ForSchools from "@/components/ForSchools";
import CommunitySection from "@/components/CommunitySection";
import Vision from "@/components/Vision";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME}: ${SITE_TAGLINE}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    type: "website",
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:border focus:border-border focus:rounded-md focus:text-sm"
      >
        Skip to content
      </a>
      <HeroSection />
      <main id="main" className="flex-grow">
        <AboutLab />
        <WhyExists />
        <ProblemSection />
        <Philosophy />
        <LearningJourney />
        <Programs />
        <Projects />
        <ForParents />
        <ForSchools />
        <CommunitySection />
        <Vision />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

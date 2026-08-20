import type { Metadata } from "next";
import { LabClient } from "./LabClient";
import { labMeta } from "@/content/labs/esp32-walking-robot";
import { LAB_PATH } from "@/lib/workshop-config";
import { OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: labMeta.title,
  description: labMeta.description,
  alternates: { canonical: LAB_PATH },
  openGraph: {
    title: labMeta.title,
    description: labMeta.description,
    type: "website",
    url: absoluteUrl(LAB_PATH),
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
    title: labMeta.title,
    description: labMeta.description,
    images: [OG_IMAGE.url],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: labMeta.title,
  description: labMeta.description,
  url: absoluteUrl(LAB_PATH),
};

export default function LabPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <LabClient />
    </>
  );
}

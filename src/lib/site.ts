/** Canonical site config for metadata, sitemap, and JSON-LD. */

export const SITE_URL = "https://aurigen.tech";
export const SITE_NAME = "Aurigen";
export const SITE_TAGLINE = "Forge builders of intelligent machines";

export const SITE_DESCRIPTION =
  "Aurigen is an engineering institution that forges AI engineers, robotics innovators, builders, researchers, and founders through labs, mentors, and shipped systems.";

/** Absolute URL helper. Paths should start with /. Page paths get a trailing slash. */
export function absoluteUrl(path = "/"): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const looksLikeFile = /\.[a-zA-Z0-9]+$/.test(normalized);
  if (looksLikeFile || normalized.endsWith("/")) {
    return `${SITE_URL}${normalized}`;
  }
  return `${SITE_URL}${normalized}/`;
}

export const OG_IMAGE = {
  url: "/about/hero.jpg",
  width: 1600,
  height: 900,
  alt: "Students gathered around a line-following robotics competition track",
};

export const ORG_LOGO = {
  url: "/logos/aurigen_logo_light.png",
  width: 512,
  height: 512,
};

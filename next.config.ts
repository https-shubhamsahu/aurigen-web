import type { NextConfig } from "next";

// Project Pages path hosting needs /aurigen-web. Apex custom domains must use "".
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "html.tailus.io",
        pathname: "/blocks/customers/**",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;

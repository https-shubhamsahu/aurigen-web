import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
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
  // Project Pages URL is /aurigen-web/; custom domains use root.
  // Leave basePath empty for custom-domain hosting.
  trailingSlash: true,
};

export default nextConfig;

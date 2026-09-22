import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes a deployable site to /out.
  output: "export",
  trailingSlash: true,
  // A stray package-lock.json in the user folder confuses root detection.
  turbopack: { root: process.cwd() },
  images: {
    // Static export has no image server. Ship pre-sized WebP/SVG in /public/images.
    unoptimized: true,
  },
};

export default nextConfig;

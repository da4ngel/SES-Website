import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

// This is a static export: the same build output serves every environment, so the
// only place to tell preview deploys apart from production is a build-time env var.
// VERCEL_ENV is "production" only on the production deployment; absent locally
// (plain `next build`), which intentionally falls back to allowing indexing.
const isProduction = process.env.VERCEL_ENV !== "preview" && process.env.VERCEL_ENV !== "development";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: isProduction ? "/" : undefined, disallow: isProduction ? undefined : "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

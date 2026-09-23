import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { allRoutes } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path.startsWith("/news/") ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 3 ? 0.6 : 0.8,
  }));
}

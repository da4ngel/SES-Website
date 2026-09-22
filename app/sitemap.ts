import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { caseStudies } from "@/content/caseStudies";
import { news } from "@/content/news";
import { techNav } from "@/content/technology";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/solutions/", "/results/", "/pilot/", "/ses-pro/", "/news/", "/about/", "/contact/", "/privacy/"];
  const all = [
    ...pages,
    ...techNav.map((t) => t.href),
    ...solutions.map((s) => `/solutions/${s.slug}/`),
    ...caseStudies.map((c) => `/results/${c.slug}/`),
    ...news.map((n) => `/news/${n.slug}/`),
  ];
  return all.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path.startsWith("/news/") ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 3 ? 0.6 : 0.8,
  }));
}

import { techNav } from "@/content/technology";
import { solutions } from "@/content/solutions";
import { caseStudies } from "@/content/caseStudies";
import { news } from "@/content/news";

/** Every real route on the site, as a path (no domain). Used by app/sitemap.ts (XML)
 * and the HTML sitemap page so the two can never drift apart. */
export function allRoutes(): string[] {
  const pages = [
    "/",
    "/solutions/",
    "/results/",
    "/pilot/",
    "/ses-pro/",
    "/news/",
    "/about/",
    "/contact/",
    "/faq/",
    "/savings-calculator/",
    "/html-sitemap/",
    "/privacy/",
    "/terms/",
    "/cookies/",
    "/accessibility/",
  ];
  return [
    ...pages,
    ...techNav.map((t) => t.href),
    ...solutions.map((s) => `/solutions/${s.slug}/`),
    ...caseStudies.map((c) => `/results/${c.slug}/`),
    ...news.map((n) => `/news/${n.slug}/`),
  ];
}

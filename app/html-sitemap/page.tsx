import Link from "next/link";
import { seo } from "@/content/seo";
import { nav } from "@/content/site";
import { techNav } from "@/content/technology";
import { solutions } from "@/content/solutions";
import { caseStudies } from "@/content/caseStudies";
import { news } from "@/content/news";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

export const metadata = pageMetadata({ ...seo.htmlSitemap, path: "/html-sitemap/" });

type Group = { title: string; links: { label: string; href: string }[] };

// Built from the same content the pages themselves are built from — see lib/routes.ts
// for the machine-readable (XML) version of this same list.
function groups(): Group[] {
  return [
    {
      title: "Main",
      links: [
        { label: "Home", href: "/" },
        ...nav.links,
        { label: "Contact", href: "/contact/" },
        { label: "FAQ", href: "/faq/" },
        { label: "Savings calculator", href: "/savings-calculator/" },
      ],
    },
    { title: "Technology", links: techNav },
    { title: "Solutions", links: solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}/` })) },
    { title: "Results", links: [{ label: "All results", href: "/results/" }, ...caseStudies.map((c) => ({ label: c.client, href: `/results/${c.slug}/` }))] },
    { title: "News", links: [{ label: "All news", href: "/news/" }, ...news.map((n) => ({ label: n.title, href: `/news/${n.slug}/` }))] },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy/" },
        { label: "Terms", href: "/terms/" },
        { label: "Cookies", href: "/cookies/" },
        { label: "Accessibility", href: "/accessibility/" },
      ],
    },
  ];
}

export default function HtmlSitemapPage() {
  return (
    <>
      <PageHero eyebrow="Sitemap" title="Every page on this site." />
      <Section className="pb-24 md:pb-32">
        <div className="mx-auto grid max-w-[52rem] gap-10 sm:grid-cols-2">
          {groups().map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="text-title mb-3 text-text">{g.title}</h2>
              <ul className="space-y-2">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-body text-text-2 hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Section>
    </>
  );
}

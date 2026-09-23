import { seo } from "@/content/seo";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = pageMetadata({ ...seo.accessibility, path: "/accessibility/" });

const LAST_UPDATED = "September 23, 2026";

const sections = [
  {
    title: "Our target",
    body: "We're building this site to meet WCAG 2.2 Level AA. That's an ongoing commitment, not a one-time checkbox — we test and fix issues as we find them.",
  },
  {
    title: "What's already in place",
    body: "A skip-to-content link on every page, visible focus outlines on every interactive element, one <header>/<main>/<footer> landmark structure with one <h1> per page, full keyboard support on the form and carousels, tap targets sized to Apple/Google's 44px guidance, and support for your OS's reduced-motion setting across the site's animation.",
  },
  {
    title: "How we keep it that way",
    body: "We test regularly against WCAG 2.2 as the site changes, and welcome reports of anything we've missed.",
  },
  {
    title: "Reporting an issue",
    body: `If you run into an accessibility barrier anywhere on this site, tell us — we want to fix it. Email ${site.email.support} with the page and what happened, and we'll get back to you.`,
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHero eyebrow="Accessibility" title="Built to work for everyone." subhead="Our conformance target, and how to reach us about issues." />
      <section className="pb-24 md:pb-32">
        <div className="container-page max-w-[44rem]">
          <p className="text-caption text-text-2">Last updated: {LAST_UPDATED}</p>
          {sections.map((s) => (
            <div key={s.title} className="border-t border-hairline py-8">
              <h2 className="text-title text-text">{s.title}</h2>
              <p className="text-body mt-3 text-text-2">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

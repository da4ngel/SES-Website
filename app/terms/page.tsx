import { seo } from "@/content/seo";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = pageMetadata({ ...seo.terms, path: "/terms/" });

// TODO: legal review before launch. Governing-law jurisdiction is set to
// Massachusetts (matches the Westborough, MA address in content/site.ts) — confirm
// that's actually where SES wants disputes governed before this goes live.
const LAST_UPDATED = "September 23, 2026";

const sections = [
  {
    title: "Agreement to these terms",
    body: `These terms apply to your use of this website, ${site.url.replace("https://", "")}. They don't cover the SES hardware, software or services you'd use as a customer — those are governed by your separate service agreement with SES.`,
  },
  {
    title: "Using this site",
    body: "You may browse this site and submit forms to inquire about SES products and services. You agree not to use this site to submit false information, attempt to disrupt or gain unauthorized access to it, or scrape its content for a competing use.",
  },
  {
    title: "No warranty on this website",
    body: "This website and its content are provided \"as is.\" We've tried to keep everything on it accurate and current, but we don't guarantee it's error-free, and information here (including estimated savings figures) is illustrative, not a quote or contractual commitment.",
  },
  {
    title: "Intellectual property",
    body: `Everything on this site — text, graphics, the SES name and logo, and the underlying design — belongs to ${site.name} or its licensors. You may view and share pages of this site, but you may not reproduce, modify or redistribute its content for commercial use without our written permission.`,
  },
  {
    title: "Third-party links",
    body: "This site links to external resources (news coverage, partner sites, downloadable PDFs). We don't control and aren't responsible for the content or practices of sites we link to.",
  },
  {
    title: "Limitation of liability",
    body: `To the extent permitted by law, ${site.name} isn't liable for any indirect, incidental or consequential damages arising from your use of this website.`,
  },
  {
    title: "Governing law",
    // TODO: confirm this is the jurisdiction SES actually wants for the website terms.
    body: "These terms are governed by the laws of the Commonwealth of Massachusetts, without regard to its conflict-of-law rules.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of this site after a change means you accept the updated terms.",
  },
  {
    title: "Contact",
    body: `Questions about these terms? Email ${site.email.sales}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Terms" title="Terms of Service." subhead="The terms that apply to using this website." />
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

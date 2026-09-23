import { seo } from "@/content/seo";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = pageMetadata({ ...seo.cookies, path: "/cookies/" });

const LAST_UPDATED = "September 23, 2026";

const sections = [
  {
    title: "What this page covers",
    body: "This page lists everything this website stores in your browser — today, and once analytics is turned on.",
  },
  {
    title: "What we store today",
    body: "One item: your light/dark theme preference, in your browser's local storage. This is not technically a cookie — it isn't sent to our servers with each request — but we're listing it here for completeness. It's set the moment you use the theme toggle and stays until you clear your browser's site data.",
  },
  {
    // TODO: this section describes what will be true once NEXT_PUBLIC_GA_MEASUREMENT_ID is
    // set (see app/layout.tsx). A cookie-consent banner should ship in the same change that
    // turns analytics on for real — the copy below already commits to that.
    title: "Once analytics is enabled",
    body: "When Google Analytics (GA4) is turned on, it sets cookies to distinguish visitors and measure how the site is used (which pages are viewed, whether a form was submitted). At that point, this site will also add a consent mechanism before those cookies are set, as required for tracking cookies.",
  },
  {
    title: "No advertising or third-party tracking cookies",
    body: "This site doesn't use advertising cookies, retargeting pixels, or any cookie that shares data with a third party for their own advertising purposes.",
  },
  {
    title: "Managing cookies",
    body: "You can clear or block cookies at any time through your browser's settings. Blocking analytics cookies won't affect your ability to browse this site or submit a form.",
  },
  {
    title: "Contact",
    body: `Questions about this page? Email ${site.email.sales}.`,
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHero eyebrow="Cookies" title="Cookie Policy." subhead="What this site stores in your browser, and why." />
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

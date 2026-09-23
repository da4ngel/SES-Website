import { seo } from "@/content/seo";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = pageMetadata({ ...seo.privacy, path: "/privacy/" });

// TODO: legal review before launch. This reflects what the site actually does today
// (see components/forms/Form.tsx, lib/analytics.ts) — update it if either changes.
const LAST_UPDATED = "September 23, 2026";

const sections = [
  {
    title: "What we collect",
    body: "When you fill in a form on this website (contact, pilot program or SES Pro application), we receive the details you enter: name, work email, phone, company, job title, and anything you write in a message field. We don't collect payment information on this site.",
  },
  {
    title: "Cookies and local storage",
    body: "This site stores one preference in your browser's local storage — whether you've chosen light or dark mode. That isn't a cookie and isn't sent to our servers. " +
      "If analytics is enabled (see below), Google Analytics sets its own cookies to measure site usage.",
  },
  {
    title: "Analytics",
    // TODO: this section describes the intended behavior once NEXT_PUBLIC_GA_MEASUREMENT_ID
    // is set (see app/layout.tsx). If analytics is live, confirm this still matches reality.
    body: `We use Google Analytics (GA4) to understand how visitors use this site — which pages are viewed, and whether a form was submitted. Google Analytics uses cookies and collects information such as your IP address, browser and device type, and pages visited. We don't use this data to identify you personally. See Google's privacy policy for how Google handles this data.`,
  },
  {
    title: "How we use it",
    body: "We use the details you submit to reply to you, follow up about SES products and services, and keep records of that conversation. We don't sell your information, and we don't use it for anything other than what you'd reasonably expect from submitting a business inquiry.",
  },
  {
    title: "Legal basis and your state rights",
    body: `SES serves US retail and commercial customers nationally. If you're a California resident, the California Consumer Privacy Act (CCPA/CPRA) gives you the right to know what personal information we hold about you, request its deletion, and opt out of its "sale" or "sharing" — we don't sell or share personal information collected through this site with third parties for their own marketing purposes, so there's nothing to opt out of today, but you can still reach us at the email below to exercise these rights or ask questions.`,
  },
  {
    title: "Data from installed systems",
    body: "Data collected by SES hardware and software once installed at a customer site (energy readings, equipment status, and similar operational data) is handled under that customer's service agreement, not this website's policy.",
  },
  {
    title: "Sharing and sub-processors",
    // TODO: name the actual vendors once the form backend and analytics are live
    // (e.g. a form service, email provider, Google Analytics). Keep this current.
    body: "We share form submissions with the internal SES team that follows up with you, and with any third-party service we use to process and store form submissions (not yet finalized — this section will name that service once it's live). We don't share your information with anyone else except as required by law.",
  },
  {
    title: "How long we keep it",
    // TODO: confirm an exact retention period with the SES team; this is a defensible
    // default, not a number pulled from an actual internal policy.
    body: "We keep the information you submit for as long as it's useful for the purpose you submitted it — generally, while we're in an active conversation with you, and for a reasonable period afterward for our business records — and delete or anonymize it when it's no longer needed, or sooner if you ask us to.",
  },
  {
    title: "Your choices",
    body: `You can ask us to access, correct, or delete your details at any time, or ask us not to contact you again. Email ${site.email.sales} and we'll handle it promptly.`,
  },
  {
    title: "Children's privacy",
    body: "This site is intended for business visitors and isn't directed at children. We don't knowingly collect information from anyone under 16.",
  },
  {
    title: "Changes to this policy",
    body: "If we materially change how we handle your information, we'll update this page and the date below.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Your information, handled with care." subhead="How we treat what you share on this website." />
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

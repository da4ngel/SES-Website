import { seo } from "@/content/seo";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = pageMetadata({ ...seo.privacy, path: "/privacy/" });

// TODO: legal review. This is a plain-language starting point, not final policy text.
const sections = [
  {
    title: "What we collect",
    body: "When you fill in our contact form, we receive the details you enter: your name, work email, phone, company, job title and message.",
  },
  {
    title: "How we use it",
    body: "We use these details only to reply to you and to talk about SES products. We don't sell your information.",
  },
  {
    title: "Customer data",
    body: "Data from installed systems is handled under each customer's service agreement, not this website policy.",
  },
  {
    title: "Your choices",
    body: `You can ask us to update or delete your details at any time. Email ${site.email.sales}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Your information, handled with care." subhead="How we treat what you share on this website." />
      <section className="pb-24 md:pb-32">
        <div className="container-page max-w-[44rem]">
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

import { seo } from "@/content/seo";
import { technologyFaq, managedServicesFaq } from "@/content/technology";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";

export const metadata = pageMetadata({ ...seo.faq, path: "/faq/" });

// Same real content already shown split across /technology/ and
// /technology/how-it-works/ — collected here as one answer page.
const items = [...technologyFaq, ...managedServicesFaq];

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Everything you're wondering." subhead="About the DLC, the platform and our managed services." />
      <Section className="pb-24 md:pb-32">
        <Faq items={items} />
      </Section>
    </>
  );
}

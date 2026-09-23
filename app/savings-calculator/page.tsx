import { seo } from "@/content/seo";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SavingsCalculator } from "@/components/calculator/SavingsCalculator";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMetadata({ ...seo.savingsCalculator, path: "/savings-calculator/" });

export default function SavingsCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Savings calculator"
        title="What could your sites save?"
        subhead="A rough estimate based on the savings SES customers see, up to 30% on HVAC energy."
      />
      <Section className="pb-24 md:pb-32">
        <SavingsCalculator />
        <p className="text-caption mx-auto mt-8 max-w-[36rem] text-center text-text-2">
          This is an estimate for planning purposes, not a quote. Actual savings depend on your equipment, climate and how your
          sites are used today.
        </p>
      </Section>
      <FinalCta />
    </>
  );
}

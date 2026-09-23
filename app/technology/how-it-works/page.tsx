import { seo } from "@/content/seo";
import { howItWorksIntro, howItWorksPage, steps, whatWeInstall } from "@/content/howItWorks";
import { howItWorksBenefits, managedServicesFaq } from "@/content/technology";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { StepVisual } from "@/components/home/StepVisual";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMetadata({ ...seo.howItWorks, path: "/technology/how-it-works/" });

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Technology", path: "/technology/" },
              { name: "How it works", path: "/technology/how-it-works/" },
            ]),
          ),
        }}
      />
      <PageHero eyebrow={howItWorksPage.eyebrow} title={howItWorksPage.headline} subhead={howItWorksPage.subhead}>
        <Button href="/contact/#book" size="lg">
          Book a call
        </Button>
      </PageHero>

      <Section tone="alt" aria-labelledby="install-title">
        <Reveal>
          <Heading id="install-title" eyebrow={whatWeInstall.eyebrow} title={whatWeInstall.headline} size="headline" />
          <p className="text-body mx-auto mt-6 max-w-[36rem] text-center text-text-2">{howItWorksIntro.explainer}</p>
        </Reveal>
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {whatWeInstall.items.map((item, i) => (
            <Reveal as="li" key={item.title} index={i}>
              <Card radius="lg" className="h-full p-7 md:p-8">
                <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon name={item.icon} className="size-[1.375rem]" />
                </span>
                <h3 className="text-title mt-8 text-text">{item.title}</h3>
                <p className="text-body mt-2 text-text-2">{item.line}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="steps-title">
        <Reveal>
          <Heading id="steps-title" eyebrow="The optimization process" title="How the savings add up." size="headline" />
        </Reveal>
        <ol className="mt-16 space-y-20 md:mt-24 md:space-y-32">
          {steps.map((s, i) => (
            <li key={s.id} id={s.id} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
              <Reveal className={cn(i % 2 === 1 && "md:order-2")}>
                <div className="aspect-[10/9] rounded-panel bg-surface-2 p-6 ring-1 ring-inset ring-hairline md:p-8">
                  <StepVisual kind={s.visual} />
                </div>
              </Reveal>
              <Reveal index={1}>
                <span className="text-eyebrow inline-flex items-center gap-2 text-accent">
                  <Icon name={s.icon} className="size-4" /> Step {i + 1}
                </span>
                <h3 className="text-headline mt-3 text-text">{s.title}</h3>
                <p className="text-subhead mt-4 text-text">{s.line}</p>
                <p className="text-body mt-4 max-w-[30rem] text-text-2">{s.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="alt" aria-labelledby="benefits-title">
        <Reveal>
          <Heading id="benefits-title" title="Better for owners and managers." size="headline" />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorksBenefits.map((b, i) => (
            <Reveal as="li" key={b.title} index={i % 3}>
              <Card radius="lg" className="h-full p-7">
                <h3 className="text-title text-text">{b.title}</h3>
                <p className="text-body mt-2 text-text-2">{b.line}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="faq">
        <Faq items={managedServicesFaq} />
      </Section>

      <FinalCta />
    </>
  );
}

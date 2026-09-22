import { seo } from "@/content/seo";
import { techOverview, technologyFaq } from "@/content/technology";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMetadata({ ...seo.technology, path: "/technology/" });

export default function TechnologyPage() {
  const t = techOverview;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.headline} subhead={t.subhead}>
        <Button href="/technology/how-it-works/" size="lg">
          See how it works
        </Button>
        <Button href="/pilot/" size="lg" variant="secondary">
          Start a pilot
        </Button>
      </PageHero>

      <Section tone="alt" aria-label="The three parts" className="pt-16! md:pt-20!">
        <ul className="grid gap-4 md:grid-cols-3">
          {t.pillars.map((p, i) => (
            <Reveal as="li" key={p.title} index={i}>
              <Card radius="lg" className="h-full p-7 md:p-8">
                <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon name={p.icon} className="size-[1.375rem]" />
                </span>
                <h2 className="text-title mt-8 text-text">{p.title}</h2>
                <p className="text-body mt-2 text-text-2">{p.line}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="integration-title">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <Heading id="integration-title" title={t.integration.headline} subhead={t.integration.line} size="display" align="left" />
          </Reveal>
          <Reveal index={1}>
            <ul className="divide-y divide-hairline rounded-panel bg-surface-2 px-6 ring-1 ring-inset ring-hairline md:px-8">
              {t.integration.points.map((p) => (
                <li key={p} className="text-body flex gap-3 py-5 text-text">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="explore-title">
        <Heading id="explore-title" title="Go deeper." size="headline" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.sections.map((s, i) => (
            <Reveal as="li" key={s.href} index={i}>
              <Card href={s.href} radius="lg" className="h-full p-7">
                <h3 className="text-title text-text">{s.title}</h3>
                <p className="text-body mt-2 text-text-2">{s.line}</p>
                <p className="text-body mt-6 font-medium text-accent" aria-hidden="true">
                  Explore ›
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="faq">
        <Faq items={technologyFaq} />
      </Section>

      <FinalCta />
    </>
  );
}

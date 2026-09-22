import { resultsTeaser } from "@/content/home";
import { getCaseStudy, type CaseStudy } from "@/content/caseStudies";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/** Three case studies, each led by its strongest real number. */
export function ResultsTeaser() {
  const items = resultsTeaser.slugs.map(getCaseStudy).filter((c): c is CaseStudy => !!c);
  return (
    <Section aria-labelledby="teaser-title">
      <Reveal>
        <Heading id="teaser-title" eyebrow={resultsTeaser.eyebrow} title={resultsTeaser.headline} />
      </Reveal>
      <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3">
        {items.map((c, i) => (
          <Reveal as="li" key={c.slug} index={i}>
            <Card href={`/results/${c.slug}/`} radius="lg" className="h-full">
              <div className="flex h-full flex-col p-7 md:p-8">
                <p className="text-stat text-text">{c.stats[0].value}</p>
                <p className="text-body mt-2 text-text-2">{c.stats[0].label}</p>
                <div className="mt-auto pt-10">
                  <p className="text-caption font-medium text-accent">{c.client}</p>
                  <h3 className="text-title mt-1 text-text">{c.headline}</h3>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </ul>
      <div className="mt-12 text-center">
        <Button href={resultsTeaser.cta.href} variant="ghost">
          {resultsTeaser.cta.label} ›
        </Button>
      </div>
    </Section>
  );
}

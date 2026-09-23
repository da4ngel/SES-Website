import { seo } from "@/content/seo";
import { caseStudies, industries } from "@/content/caseStudies";
import { clients, proofLine, testimonials } from "@/content/results";
import { scale } from "@/content/company";
import { socialProof } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";
import { reviewJsonLd } from "@/lib/jsonld";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { LogoWall } from "@/components/ui/LogoWall";
import { StatTiles } from "@/components/ui/StatTiles";
import { ResultsGrid } from "@/components/results/ResultsGrid";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMetadata({ ...seo.results, path: "/results/" });

export default function ResultsPage() {
  return (
    <>
      {reviewJsonLd(testimonials).map((review, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(review) }} />
      ))}
      <PageHero eyebrow="Results" title="Real sites. Real savings." subhead="Case studies from gyms, dealerships, hotels, factories and churches." />

      <Section tone="alt" aria-label="SES at a glance" className="pt-16! md:pt-20!">
        <StatTiles stats={scale} />
      </Section>

      <Section aria-labelledby="cases-title">
        <Reveal>
          <Heading id="cases-title" eyebrow="Case studies" title="Proof, site by site." size="headline" />
        </Reveal>
        <div className="mt-12">
          <ResultsGrid items={caseStudies} industries={industries} />
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="voices-title">
        <Reveal>
          <Heading id="voices-title" eyebrow="In their words" title="What customers say." size="headline" />
        </Reveal>
        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} index={i % 2}>
              <Card radius="lg" className="h-full p-7 md:p-8">
                <figure className="flex h-full flex-col">
                  <blockquote className="text-subhead text-text">
                    <p>“{t.quote}”</p>
                  </blockquote>
                  <figcaption className="text-body mt-auto pt-8 text-text-2">
                    <span className="font-semibold text-text">{t.name}</span>
                    <br />
                    {t.role}, {t.company}
                  </figcaption>
                </figure>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="clients-title">
        <Reveal>
          <Heading id="clients-title" title={socialProof.headline} subhead={socialProof.subhead} size="headline" />
        </Reveal>
        <Reveal className="mt-12">
          <LogoWall names={clients} />
          <p className="text-caption mt-8 text-center font-medium text-text-2">{proofLine}</p>
        </Reveal>
      </Section>

      <FinalCta />
    </>
  );
}

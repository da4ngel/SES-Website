import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSolution, solutions } from "@/content/solutions";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/home/FinalCta";
import { SolutionSections } from "@/components/solutions/SolutionSections";
import { getCaseStudy } from "@/content/caseStudies";

// Every solution page is generated at build time from content/solutions.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return pageMetadata({ title: s.title, description: `${s.headline} ${s.subhead}`, path: `/solutions/${s.slug}/` });
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const index = solutions.indexOf(s);
  const related = [1, 2, 3].map((n) => solutions[(index + n) % solutions.length]);
  const study = s.caseStudy ? getCaseStudy(s.caseStudy) : undefined;

  return (
    <>
      <section className="pb-16 pt-20 text-center md:pb-24 md:pt-28">
        <div className="container-page">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent-soft text-accent">
            <Icon name={s.icon} className="size-7" />
          </span>
          <p className="text-eyebrow mt-6 text-accent">{s.product ?? s.title}</p>
          <h1 className="text-display mx-auto mt-3 max-w-[18ch] text-text">{s.headline}</h1>
          <p className="text-subhead mx-auto mt-5 max-w-[34rem] text-text-2">{s.subhead}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/contact/#book" size="lg">
              Book a call
            </Button>
            <Button href="/technology/how-it-works/" size="lg" variant="secondary">
              See how it works
            </Button>
          </div>
        </div>
      </section>

      <Section tone="alt">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          {s.stat && (
            <p className="mb-10">
              <span className="text-stat block text-text">{s.stat.value}</span>
              <span className="text-body mt-2 block text-text-2">{s.stat.label}</span>
            </p>
          )}
          <p className="text-headline text-text">{s.intro}</p>
        </Reveal>

        <ul className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3">
          {s.benefits.map((b, i) => (
            <Reveal as="li" key={b.title} index={i}>
              <Card radius="lg" className="h-full p-7 md:p-8">
                <h2 className="text-title text-text">{b.title}</h2>
                <p className="text-body mt-2 text-text-2">{b.line}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {s.sections && <SolutionSections sections={s.sections} />}

      {(study || s.download) && (
        <Section tone={s.sections && s.sections.length % 2 === 1 ? "alt" : "default"} aria-label="Proof">
          <div className="mx-auto grid max-w-[56rem] gap-4 md:grid-cols-2">
            {study && (
              <Card href={`/results/${study.slug}/`} radius="lg" className={study && s.download ? "p-7 md:p-8" : "p-7 md:col-span-2 md:p-8"}>
                <p className="text-caption font-medium text-accent">Case study · {study.client}</p>
                <p className="text-stat mt-4 text-text">{study.stats[0].value}</p>
                <p className="text-body mt-2 text-text-2">{study.stats[0].label}</p>
                <p className="text-body mt-6 font-medium text-accent" aria-hidden="true">Read the story ›</p>
              </Card>
            )}
            {s.download && (
              <Card radius="lg" className="flex flex-col justify-between p-7 md:p-8">
                <div>
                  <p className="text-caption font-medium text-accent">Download</p>
                  <h2 className="text-title mt-3 text-text">{s.download.label}</h2>
                </div>
                <div className="mt-6">
                  <Button href={s.download.href} variant="secondary" target="_blank" rel="noopener">
                    Open PDF
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </Section>
      )}

      <Section aria-labelledby="related-title">
        <Heading id="related-title" title="Works well with" size="headline" />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Card href={`/solutions/${r.slug}/`} radius="lg" className="h-full p-7">
                <span className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon name={r.icon} className="size-5" />
                </span>
                <h3 className="text-title mt-6 text-text">{r.title}</h3>
                <p className="text-body mt-2 text-text-2">{r.line}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}

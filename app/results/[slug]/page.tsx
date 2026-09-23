import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { StatTiles } from "@/components/ui/StatTiles";
import { FinalCta } from "@/components/home/FinalCta";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/results/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata({ title: `${c.client}: ${c.headline}`, description: c.line, path: `/results/${c.slug}/` });
}

export default async function CaseStudyPage({ params }: PageProps<"/results/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const others = caseStudies.filter((o) => o.slug !== c.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Results", path: "/results/" },
              { name: c.client, path: `/results/${c.slug}/` },
            ]),
          ),
        }}
      />
      <section className="pb-14 pt-20 text-center md:pb-20 md:pt-28">
        <div className="container-page">
          <p className="text-eyebrow text-accent">
            {c.client}
            {c.location && <span className="font-normal text-text-2"> · {c.location}</span>}
          </p>
          <h1 className="text-display mx-auto mt-3 max-w-[16ch] text-text">{c.headline}</h1>
          <p className="text-subhead mx-auto mt-5 max-w-[34rem] text-text-2">{c.line}</p>
        </div>
      </section>

      <Section tone="alt" aria-label="Results in numbers" className="pt-16! md:pt-20!">
        <StatTiles stats={c.stats} />
      </Section>

      <Section aria-label="The story">
        <div className="mx-auto grid max-w-[60rem] gap-12 md:grid-cols-3 md:gap-10">
          <Reveal>
            <h2 className="text-eyebrow text-accent">The challenge</h2>
            <p className="text-body mt-3 text-text">{c.challenge}</p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="text-eyebrow text-accent">The solution</h2>
            <p className="text-body mt-3 text-text">{c.solution}</p>
          </Reveal>
          <Reveal index={2}>
            <h2 className="text-eyebrow text-accent">The results</h2>
            <ul className="text-body mt-3 space-y-2 text-text">
              {c.results.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {c.quote && (
          <Reveal className="mx-auto mt-20 max-w-[48rem] text-center">
            <figure>
              <blockquote className="text-headline text-text">
                <p>“{c.quote.text}”</p>
              </blockquote>
              <figcaption className="text-body mt-6 text-text-2">
                <span className="font-semibold text-text">{c.quote.name}</span>, {c.quote.role}
              </figcaption>
            </figure>
          </Reveal>
        )}

        <p className="text-caption mt-16 text-center text-text-2">
          {c.year && <>Measured {c.year}. </>}
          <a href={c.source} className="underline underline-offset-4 hover:text-text" rel="noopener">
            Read the original case study
          </a>
        </p>
      </Section>

      <Section tone="alt" aria-labelledby="more-title">
        <Heading id="more-title" title="More results" size="headline" />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Card href={`/results/${o.slug}/`} radius="lg" className="h-full p-7">
                <p className="text-caption font-medium text-accent">{o.client}</p>
                <h3 className="text-title mt-3 text-text">{o.headline}</h3>
                <p className="text-body mt-2 text-text-2">{o.line}</p>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Button href="/results/" variant="ghost">
            All results ›
          </Button>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}

import Link from "next/link";
import { seo } from "@/content/seo";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/home/FinalCta";
import { StatTiles } from "@/components/ui/StatTiles";
import { awards, esg, scale } from "@/content/company";

export const metadata = pageMetadata({ ...seo.about, path: "/about/" });

export default function AboutPage() {
  const a = site.address;
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.headline} subhead={about.subhead} />

      <Section tone="alt" aria-label="SES in numbers" className="pt-16! md:pt-20!">
        <StatTiles stats={scale} />
      </Section>

      <Section aria-labelledby="story-title">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <h2 id="story-title" className="text-display text-text">
            {about.story.headline}
          </h2>
          {about.story.paragraphs.map((p) => (
            <p key={p} className="text-subhead mt-6 text-text-2">
              {p}
            </p>
          ))}
        </Reveal>
        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {about.principles.map((p, i) => (
            <Reveal as="li" key={p.title} index={i}>
              <Card radius="lg" className="h-full p-7 md:p-8">
                <h3 className="text-title text-text">{p.title}</h3>
                <p className="text-body mt-2 text-text-2">{p.line}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="alt" aria-labelledby="esg-title">
        <Reveal>
          <Heading id="esg-title" eyebrow={esg.eyebrow} title={esg.headline} subhead={esg.subhead} size="headline" />
        </Reveal>
        <StatTiles stats={esg.stats} className="mt-12" />
        <p className="text-caption mx-auto mt-6 max-w-[40rem] text-center text-text-2">
          {esg.note} {esg.minorityOwned}{" "}
          <Link href="/news/hvac-esg-impact-report-2025/" className="text-accent underline underline-offset-4">
            Read the report
          </Link>
        </p>
      </Section>

      <Section aria-labelledby="awards-title">
        <Reveal>
          <Heading id="awards-title" eyebrow="Recognition" title="Backed by clean-energy leaders." size="headline" />
        </Reveal>
        <ul className="mx-auto mt-12 grid max-w-[56rem] gap-4 md:grid-cols-2">
          {awards.map((a, i) => (
            <Reveal as="li" key={a.title} index={i}>
              <Card href={a.href} radius="lg" className="h-full p-7">
                <p className="text-caption font-medium text-accent">{a.year}</p>
                <h3 className="text-title mt-2 text-text">{a.title}</h3>
                <p className="text-body mt-2 text-text-2">{a.line}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="alt" aria-labelledby="hq-title">
        <Reveal>
          <Heading id="hq-title" eyebrow="Headquarters" title={about.hq.headline} subhead={about.hq.line} size="headline" />
          <address className="text-body mt-8 text-center not-italic text-text-2">
            {a.street}
            <br />
            {a.city}, {a.region} {a.postalCode}
          </address>
          <div className="mt-8 flex justify-center">
            <Button href="/contact/" variant="secondary">
              Contact us
            </Button>
          </div>
        </Reveal>
      </Section>

      <FinalCta />
    </>
  );
}

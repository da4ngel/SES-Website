import { seo } from "@/content/seo";
import { pilotPage } from "@/content/pilot";
import { pilotForm } from "@/content/forms";
import { testimonials } from "@/content/results";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { StatTiles } from "@/components/ui/StatTiles";
import { Form } from "@/components/forms/Form";

export const metadata = pageMetadata({ ...seo.pilot, path: "/pilot/" });

export default function PilotPage() {
  const p = pilotPage;
  const quote = testimonials[1];
  return (
    <>
      {/* Brand navy hero band */}
      <section className="bg-brand-navy pb-20 pt-20 text-center text-white md:pb-28 md:pt-28">
        <div className="container-page">
          <p className="text-eyebrow text-teal-on-navy">{p.eyebrow}</p>
          <h1 className="text-display mx-auto mt-3 max-w-[16ch]">{p.headline}</h1>
          <p className="text-subhead mx-auto mt-5 max-w-[34rem] text-white/75">{p.subhead}</p>
          <Button href="#apply" size="lg" variant="onNavy" className="mt-10">
            Apply now
          </Button>
          <dl className="mx-auto mt-16 grid max-w-[52rem] gap-8 sm:grid-cols-3">
            {p.promises.map((x) => (
              <div key={x.label} className="flex flex-col-reverse">
                <dt className="text-body mt-2 text-white/70">{x.label}</dt>
                <dd className="text-display tabular-nums text-teal-on-navy">{x.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section aria-labelledby="steps-title">
        <Reveal>
          <Heading id="steps-title" title="Four steps to proof." size="headline" />
        </Reveal>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.steps.map((s, i) => (
            <Reveal as="li" key={s.title} index={i}>
              <Card radius="lg" className="h-full p-7">
                <span className="text-display block tabular-nums text-accent">{i + 1}</span>
                <h3 className="text-title mt-4 text-text">{s.title}</h3>
                <p className="text-body mt-2 text-text-2">{s.line}</p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="alt" aria-labelledby="example-title">
        <Reveal>
          <Heading id="example-title" title={p.example.headline} subhead={p.example.line} size="headline" />
        </Reveal>
        <StatTiles stats={p.example.stats} className="mx-auto mt-12 max-w-[44rem]" />
      </Section>

      <Section aria-label="Customer quote">
        <Reveal className="mx-auto max-w-[48rem] text-center">
          <figure>
            <blockquote className="text-headline text-text">
              <p>“{quote.quote}”</p>
            </blockquote>
            <figcaption className="text-body mt-6 text-text-2">
              <span className="font-semibold text-text">{quote.name}</span>, {quote.role}, {quote.company}
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      <Section tone="alt" id="apply" aria-labelledby="apply-title">
        <Card radius="lg" className="mx-auto max-w-[48rem] p-6 sm:p-8 md:p-10">
          <h2 id="apply-title" className="text-headline text-text">
            {p.formHeadline}
          </h2>
          <p className="text-body mt-2 text-text-2">{p.formLine}</p>
          <div className="mt-8">
            <Form schema={pilotForm} />
          </div>
        </Card>
      </Section>
    </>
  );
}

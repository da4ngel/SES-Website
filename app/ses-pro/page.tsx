import { seo } from "@/content/seo";
import { sesPro } from "@/content/sesPro";
import { sesProForm } from "@/content/forms";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { StatTiles } from "@/components/ui/StatTiles";
import { LogoWall } from "@/components/ui/LogoWall";
import { Form } from "@/components/forms/Form";

export const metadata = pageMetadata({ ...seo.sesPro, path: "/ses-pro/" });

export default function SesProPage() {
  const p = sesPro;
  return (
    <>
      <section className="bg-brand-navy pb-20 pt-20 text-center text-white md:pb-28 md:pt-28">
        <div className="container-page">
          <p className="text-eyebrow text-teal-on-navy">{p.eyebrow}</p>
          <h1 className="text-display mx-auto mt-3 max-w-[16ch]">{p.headline}</h1>
          <p className="text-subhead mx-auto mt-5 max-w-[34rem] text-white/75">{p.subhead}</p>
          <Button href="#apply" size="lg" variant="onNavy" className="mt-10">
            Get your free kit
          </Button>
          <p className="text-caption mt-6 text-white/65">{p.trust}</p>
        </div>
      </section>

      <Section tone="alt" aria-label="The numbers" className="pt-16! md:pt-20!">
        <StatTiles stats={p.numbers} />
      </Section>

      <Section aria-labelledby="why-title">
        <Reveal>
          <Heading id="why-title" title="Built for contractors." subhead={p.callbacks.line} size="headline" />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.why.map((w, i) => (
            <Reveal as="li" key={w.title} index={i}>
              <Card radius="lg" className="h-full p-7">
                <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon name={w.icon} className="size-[1.375rem]" />
                </span>
                <h3 className="text-title mt-8 text-text">{w.title}</h3>
                <p className="text-body mt-2 text-text-2">{w.line}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="alt" aria-labelledby="kit-title">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <Heading id="kit-title" title={p.kit.headline} subhead={p.kit.line} size="display" align="left" />
          </Reveal>
          <Reveal index={1}>
            <ul className="divide-y divide-hairline rounded-panel bg-surface px-6 ring-1 ring-inset ring-hairline md:px-8">
              {p.kit.includes.map((x) => (
                <li key={x} className="text-body flex gap-3 py-5 text-text">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="targets-title">
        <Reveal>
          <Heading id="targets-title" title="Where it sells." size="headline" />
        </Reveal>
        <Reveal className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {p.targets.map((t) => (
              <li key={t} className="text-body rounded-full bg-surface-2 px-5 py-2.5 text-text ring-1 ring-inset ring-hairline">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="mt-20">
          <p className="text-eyebrow mb-8 text-center text-text-2">Contractors already on board</p>
          <LogoWall names={p.partners} />
        </Reveal>
      </Section>

      <Section tone="alt" id="apply" aria-labelledby="apply-title">
        <Card radius="lg" className="mx-auto max-w-[48rem] p-6 sm:p-8 md:p-10">
          <h2 id="apply-title" className="text-headline text-text">
            {p.formHeadline}
          </h2>
          <p className="text-body mt-2 text-text-2">{p.formLine}</p>
          <div className="mt-8">
            <Form schema={sesProForm} />
          </div>
        </Card>
      </Section>
    </>
  );
}

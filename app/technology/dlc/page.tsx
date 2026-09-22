import { seo } from "@/content/seo";
import { dlcFeatures, technologyFaq } from "@/content/technology";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";
import { StepVisual } from "@/components/home/StepVisual";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMetadata({ ...seo.dlc, path: "/technology/dlc/" });

export default function DlcPage() {
  const d = dlcFeatures;
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.headline} subhead={d.subhead} />

      <Section tone="alt" aria-label="What the DLC does" className="pt-16! md:pt-20!">
        <Reveal className="mx-auto max-w-[40rem]">
          <div className="aspect-[10/9] rounded-panel bg-surface p-6 ring-1 ring-inset ring-hairline md:p-10">
            <StepVisual kind="zones" />
          </div>
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {d.groups.map((g, i) => (
            <Reveal as="li" key={g.title} index={i}>
              <Card radius="lg" className="h-full p-7 md:p-8">
                <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon name={g.icon} className="size-[1.375rem]" />
                </span>
                <h2 className="text-title mt-8 text-text">{g.title}</h2>
                <p className="text-body mt-2 text-text-2">{g.line}</p>
                <ul className="mt-5 space-y-2 border-t border-hairline pt-5">
                  {g.points.map((p) => (
                    <li key={p} className="text-body flex gap-2 text-text">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="faq">
        <Faq items={technologyFaq.slice(3)} />
      </Section>

      <FinalCta />
    </>
  );
}

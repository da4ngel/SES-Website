import { seo } from "@/content/seo";
import { architecture, technologyFaq } from "@/content/technology";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollStory } from "@/components/ui/ScrollStory";
import { Faq } from "@/components/ui/Faq";
import { ArchitectureVisual } from "@/components/technology/ArchitectureVisual";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMetadata({ ...seo.architecture, path: "/technology/architecture/" });

export default function ArchitecturePage() {
  const a = architecture;
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.headline} subhead={a.subhead} />

      {/* The six layers build up as you scroll (stacked cards on mobile) */}
      <Section tone="alt" aria-labelledby="layers-title" className="pt-16! md:pt-20!">
        <h2 id="layers-title" className="sr-only">
          The six layers
        </h2>
        <ScrollStory
          mobileVisualClassName="pb-2"
          items={a.layers.map((l, i) => ({
            key: l.key,
            eyebrow: `Layer ${i + 1}`,
            title: l.title,
            line: `${l.line} ${l.items.join(" · ")}.`,
            visual: <ArchitectureVisual active={i} />,
          }))}
        />
      </Section>

      <Section aria-labelledby="cloud-title">
        <Reveal>
          <Heading id="cloud-title" eyebrow="Cloud platform" title={a.cloud.headline} size="headline" />
        </Reveal>
        <Reveal className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {a.cloud.points.map((p) => (
              <li key={p} className="text-body rounded-full bg-surface-2 px-5 py-2.5 text-text ring-1 ring-inset ring-hairline">
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section tone="alt" aria-labelledby="faq">
        <Faq items={technologyFaq.slice(0, 3)} />
      </Section>

      <FinalCta />
    </>
  );
}

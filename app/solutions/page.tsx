import { seo } from "@/content/seo";
import { solutions } from "@/content/solutions";
import { solutionsSection } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMetadata({ ...seo.solutions, path: "/solutions/" });

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow={solutionsSection.eyebrow} title={solutionsSection.headline} subhead={solutionsSection.subhead} />

      <Section tone="alt" className="pt-16! md:pt-20!">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal as="li" key={s.slug} index={i % 3}>
              <Card href={`/solutions/${s.slug}/`} radius="lg" className="h-full">
                <div className="flex h-full min-h-[15rem] flex-col p-7 md:p-8">
                  <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon name={s.icon} className="size-[1.375rem]" />
                  </span>
                  <div className="mt-auto pt-10">
                    <h2 className="text-title text-text">{s.title}</h2>
                    <p className="text-body mt-2 text-text-2">{s.line}</p>
                    <p className="text-body mt-4 font-medium text-accent">Learn more ›</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}

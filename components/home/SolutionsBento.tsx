import { solutions } from "@/content/solutions";
import { solutionsSection } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * Bento grid of 7 cards. Layout (lg, 3 columns):
 *   [ FDD (wide)      ][ 2 ]
 *   [ 3 ][ 4 ][ 5 ]
 *   [ 6 ][ 7 (wide)      ]
 * Card hover lifts; press scales to 0.97 on pointer-down (the `lift` utility).
 */
export function SolutionsBento() {
  return (
    <Section tone="alt" aria-labelledby="solutions-title">
      <Reveal>
        <Heading
          id="solutions-title"
          eyebrow={solutionsSection.eyebrow}
          title={solutionsSection.headline}
          subhead={solutionsSection.subhead}
        />
      </Reveal>

      <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((s, i) => {
          const featured = i === 0;
          const wide = featured || i === solutions.length - 1;
          return (
            <Reveal
              as="li"
              key={s.slug}
              index={i % 3}
              className={cn(featured && "md:col-span-2", i === solutions.length - 1 && "lg:col-span-2")}
            >
              <Card href={`/solutions/${s.slug}/`} radius="lg" className="h-full overflow-hidden">
                <div className={cn("relative flex h-full flex-col p-7 md:p-8", wide ? "min-h-[16rem]" : "min-h-[14rem]")}>
                  <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon name={s.icon} className="size-[1.375rem]" />
                  </span>
                  <div className="mt-auto pt-10">
                    <h3 className={cn(featured ? "text-headline" : "text-title", "text-text")}>{s.title}</h3>
                    <p className="text-body mt-2 max-w-[28rem] text-text-2">{s.line}</p>
                  </div>
                  {featured && (
                    <Icon
                      name={s.icon}
                      className="pointer-events-none absolute -right-6 -top-6 size-56 text-accent opacity-[0.07]"
                    />
                  )}
                </div>
              </Card>
            </Reveal>
          );
        })}
      </ul>

      <div className="mt-12 text-center">
        <Button href={solutionsSection.cta.href} variant="ghost">
          {solutionsSection.cta.label} ›
        </Button>
      </div>
    </Section>
  );
}

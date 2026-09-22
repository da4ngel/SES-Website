import { steps, howItWorksIntro } from "@/content/howItWorks";
import { storySection } from "@/content/home";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollStory } from "@/components/ui/ScrollStory";
import { StepVisual } from "./StepVisual";

/** Homepage "How it works": the 4 steps as a pinned scroll story (stacked cards on mobile). */
export function HowItWorksStory() {
  return (
    <section id="how-it-works" aria-labelledby="story-title" className="section-y bg-bg">
      <div className="container-page">
        <Reveal>
          <Heading
            id="story-title"
            eyebrow={howItWorksIntro.eyebrow}
            title={howItWorksIntro.headline}
            subhead={howItWorksIntro.subhead}
          />
          <p className="text-body mx-auto mt-6 max-w-[36rem] text-center text-text-2">{howItWorksIntro.explainer}</p>
        </Reveal>

        <div className="mt-14 lg:mt-20">
          <ScrollStory
            items={steps.map((s, i) => ({
              key: s.id,
              eyebrow: (
                <>
                  <Icon name={s.icon} className="size-4" /> Step {i + 1}
                </>
              ),
              title: s.title,
              line: s.line,
              visual: <StepVisual kind={s.visual} />,
            }))}
          />
        </div>

        <div className="mt-12 text-center lg:mt-4">
          <Button href={storySection.cta.href} variant="ghost">
            {storySection.cta.label} ›
          </Button>
        </div>
      </div>
    </section>
  );
}

import { finalCta } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta({ content = finalCta }: { content?: typeof finalCta }) {
  return (
    <Section aria-labelledby="cta-title">
      <Reveal className="text-center">
        <Heading id="cta-title" title={content.headline} subhead={content.subhead} size="display" />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={content.primary.href} size="lg">
            {content.primary.label}
          </Button>
          <Button href={content.secondary.href} size="lg" variant="secondary">
            {content.secondary.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

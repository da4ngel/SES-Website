import { socialProof } from "@/content/home";
import { clients, proofLine, testimonials } from "@/content/results";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { LogoWall } from "@/components/ui/LogoWall";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";

export function SocialProof() {
  return (
    <Section tone="alt" aria-labelledby="proof-title">
      <Reveal>
        <Heading id="proof-title" eyebrow={socialProof.eyebrow} title={socialProof.headline} subhead={socialProof.subhead} />
      </Reveal>

      <Reveal className="mt-14 md:mt-16">
        <LogoWall names={clients} />
        <p className="text-caption mt-8 text-center font-medium text-text-2">{proofLine}</p>
      </Reveal>

      <Reveal className="mx-auto mt-16 max-w-[52rem] md:mt-24">
        <TestimonialCarousel items={testimonials} />
      </Reveal>
    </Section>
  );
}

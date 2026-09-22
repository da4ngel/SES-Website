import { hero } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

/** Full-viewport hero. Text is static (no reveal) so it paints instantly (LCP). */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-center overflow-hidden pb-12 pt-16 md:pt-20"
    >
      <div className="container-page text-center">
        <p className="text-eyebrow text-accent">{hero.eyebrow}</p>
        <h1 id="hero-title" className="text-hero mx-auto mt-3 max-w-[14ch] text-text">
          {hero.headline}
        </h1>
        <p className="text-subhead mx-auto mt-5 max-w-[32rem] text-text-2">{hero.subhead}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={hero.primaryCta.href} size="lg">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} size="lg" variant="secondary">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>
      <div className="container-page mt-10 md:mt-14">
        <HeroVisual alt={hero.visualAlt} />
      </div>
    </section>
  );
}

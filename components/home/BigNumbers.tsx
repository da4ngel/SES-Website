import { bigNumbers } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { StatNumber } from "@/components/ui/StatNumber";
import { Reveal } from "@/components/ui/Reveal";
import { scale } from "@/content/company";

export function BigNumbers() {
  return (
    <Section tone="alt" aria-labelledby="numbers-title">
      <Reveal>
        <Heading id="numbers-title" eyebrow={bigNumbers.eyebrow} title={bigNumbers.headline} size="headline" />
      </Reveal>
      <dl className="mt-16 grid gap-12 text-center md:mt-20 md:grid-cols-3 md:gap-8">
        {bigNumbers.stats.map((s, i) => (
          <Reveal key={s.label} index={i}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <StatNumber
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="text-stat block text-text"
              />
              <p className="text-body mt-3 text-text-2">{s.line}</p>
            </dd>
          </Reveal>
        ))}
      </dl>
      {/* Scale strip: quieter than the headline numbers */}
      <Reveal className="mt-16 border-t border-hairline pt-10 md:mt-20">
        <dl className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {scale.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="text-caption mt-1 text-text-2">{s.label}</dt>
              <dd className="text-headline tabular-nums text-text">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

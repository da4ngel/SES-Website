import { managedServices } from "@/content/company";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/** "An extension of your team": the human side of SES (managed services / virtual FM). */
export function ManagedServices() {
  const m = managedServices;
  return (
    <Section tone="alt" aria-labelledby="managed-title">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <Heading id="managed-title" eyebrow={m.eyebrow} title={m.headline} subhead={m.subhead} size="display" align="left" />
          <Button href={m.cta.href} variant="ghost" className="mt-6">
            {m.cta.label} ›
          </Button>
        </Reveal>
        <ul className="grid gap-3">
          {m.points.map((p, i) => (
            <Reveal as="li" key={p.title} index={i} className="rounded-card bg-surface p-6 ring-1 ring-inset ring-hairline">
              <h3 className="text-title text-text">{p.title}</h3>
              <p className="text-body mt-1 text-text-2">{p.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

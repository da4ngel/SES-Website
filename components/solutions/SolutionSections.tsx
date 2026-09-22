import type { SolutionSection } from "@/content/solutions";
import { cn } from "@/lib/cn";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Renders a solution's optional deep-dive blocks (content/solutions.ts → sections), in order.
 * Sections alternate background bands so each reads as one idea.
 */
export function SolutionSections({ sections }: { sections: SolutionSection[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <section key={i} className={cn("section-y", i % 2 === 0 ? "bg-bg" : "bg-surface-2")}>
          <div className="container-page">
            <Block s={s} />
          </div>
        </section>
      ))}
    </>
  );
}

function Block({ s }: { s: SolutionSection }) {
  switch (s.kind) {
    case "split":
      return (
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <p className="text-eyebrow text-accent">{s.eyebrow}</p>
          <h2 className="text-display mt-3 text-text">{s.headline}</h2>
          <p className="text-subhead mt-5 text-text-2">{s.line}</p>
        </Reveal>
      );

    case "compare":
      return (
        <>
          <Reveal>
            <Heading title={s.headline} size="headline" />
          </Reveal>
          <Reveal className="mx-auto mt-12 max-w-[56rem] overflow-x-auto">
            <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-[22%] pb-4" />
                  <th scope="col" className="text-caption pb-4 font-semibold text-text-2">
                    {s.columns[0]}
                  </th>
                  <th scope="col" className="text-caption pb-4 font-semibold text-accent">
                    {s.columns[1]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="text-body border-t border-hairline py-5 pr-4 font-semibold text-text">
                      {r.label}
                    </th>
                    <td className="text-body border-t border-hairline py-5 pr-4 text-text-2">{r.a}</td>
                    <td className="text-body border-t border-hairline py-5 font-medium text-text">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </>
      );

    case "story":
      return (
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <Reveal>
            <p className="text-eyebrow text-accent">{s.eyebrow}</p>
            <h2 className="text-display mt-3 text-text">{s.headline}</h2>
            <ol className="mt-8 space-y-5">
              {s.lines.map((l, i) => (
                <li key={l} className="text-subhead flex gap-4 text-text">
                  <span className="text-caption mt-1.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft font-semibold text-accent">
                    {i + 1}
                  </span>
                  {l}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal index={1}>
            <div className="rounded-panel bg-brand-navy p-10 text-center text-white md:p-14">
              <p className="text-stat text-teal-on-navy">{s.callout.value}</p>
              <p className="text-body mt-3 text-white/75">{s.callout.label}</p>
            </div>
          </Reveal>
        </div>
      );

    case "stack":
      return (
        <>
          <Reveal>
            <Heading title={s.headline} subhead={s.line} size="headline" />
          </Reveal>
          <ol className="mx-auto mt-12 flex max-w-[40rem] flex-col gap-3">
            {s.layers.map((l, i) => (
              <Reveal as="li" key={l.title} index={i}>
                <div
                  className={cn(
                    "rounded-card p-6 ring-1 ring-inset",
                    i === 0 ? "bg-accent-fill text-on-accent ring-transparent" : "bg-surface text-text ring-hairline",
                  )}
                >
                  <p className="text-title">{l.title}</p>
                  <p className={cn("text-body mt-1", i === 0 ? "opacity-85" : "text-text-2")}>{l.line}</p>
                </div>
              </Reveal>
            ))}
            <li className="text-caption mt-2 text-center font-semibold tracking-wide text-accent">= Total asset optimization</li>
          </ol>
        </>
      );

    case "steps":
      return (
        <>
          <Reveal>
            <Heading title={s.headline} size="headline" />
          </Reveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.steps.map((st, i) => (
              <Reveal as="li" key={st.title} index={i}>
                <Card radius="lg" className="h-full p-7">
                  <span className="text-display block tabular-nums text-accent">{i + 1}</span>
                  <h3 className="text-title mt-4 text-text">{st.title}</h3>
                  <p className="text-body mt-2 text-text-2">{st.line}</p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </>
      );

    case "beforeAfter":
      return (
        <>
          <Reveal>
            <Heading title={s.headline} size="headline" />
          </Reveal>
          <ul className="mx-auto mt-12 max-w-[44rem] divide-y divide-hairline border-y border-hairline">
            {s.pairs.map((p, i) => (
              <Reveal as="li" key={p.before} index={i} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-6">
                <span className="text-title text-right text-text-2 line-through decoration-text-2/40">{p.before}</span>
                <span aria-hidden="true" className="text-title text-accent">→</span>
                <span className="text-title text-text">
                  <span className="sr-only">becomes </span>
                  {p.after}
                </span>
              </Reveal>
            ))}
          </ul>
        </>
      );

    case "groups":
      return (
        <>
          <Reveal>
            <Heading title={s.headline} size="headline" />
          </Reveal>
          <ul className={cn("mt-12 grid gap-4 sm:grid-cols-2", s.groups.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
            {s.groups.map((g, i) => (
              <Reveal as="li" key={g.title} index={i}>
                <Card radius="lg" className="h-full p-7">
                  <h3 className="text-title text-text">{g.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {g.points.map((p) => (
                      <li key={p} className="text-body flex gap-2 text-text-2">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </ul>
        </>
      );
  }
}

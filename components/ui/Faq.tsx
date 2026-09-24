import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

/**
 * Native <details> accordion: keyboard and screen-reader support for free, works without JS.
 * Opening animates height where the browser supports ::details-content (see .faq in globals.css);
 * elsewhere it opens instantly.
 *
 * `renderSchema` defaults to false: this component is used on several pages with overlapping
 * subsets of the same FAQ content (technology/architecture/dlc/how-it-works), and Google treats
 * the same FAQPage markup repeated across different URLs as duplicate/spam structured data. Only
 * the one page that's the real, canonical home for this content (app/faq/page.tsx) opts in.
 */
export function Faq({
  items,
  id = "faq",
  title = "Questions, answered.",
  renderSchema = false,
}: {
  items: FaqItem[];
  id?: string;
  title?: string;
  renderSchema?: boolean;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
  return (
    <div>
      <h2 id={id} className="text-headline text-center text-text">
        {title}
      </h2>
      <div className="mx-auto mt-12 max-w-[48rem] divide-y divide-hairline border-y border-hairline">
        {items.map((it) => (
          <details key={it.q} className="faq group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-title font-medium text-text [&::-webkit-details-marker]:hidden">
              {it.q}
              <ChevronDown
                className="size-5 shrink-0 text-text-2 transition-transform duration-200 group-open:rotate-180"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </summary>
            <p className="text-body max-w-[42rem] pb-6 text-text-2">{it.a}</p>
          </details>
        ))}
      </div>
      {renderSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </div>
  );
}

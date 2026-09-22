import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

/**
 * Native <details> accordion: keyboard and screen-reader support for free, works without JS.
 * Opening animates height where the browser supports ::details-content (see .faq in globals.css);
 * elsewhere it opens instantly. Also emits FAQPage structured data.
 */
export function Faq({ items, id = "faq", title = "Questions, answered." }: { items: FaqItem[]; id?: string; title?: string }) {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}

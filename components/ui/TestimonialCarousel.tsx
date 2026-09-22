import type { Testimonial } from "@/content/results";
import { cn } from "@/lib/cn";
import { Carousel } from "./Carousel";

/** One testimonial at a time, in the swipeable Carousel. Long quotes step down a size. */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  return (
    <Carousel
      label="Customer testimonials"
      slides={items.map((t) => (
        <figure key={t.name} className="px-2 text-center md:px-8">
          <blockquote className={cn("text-text", t.quote.length > 140 ? "text-title md:text-[1.75rem] md:leading-[1.25]" : "text-headline")}>
            <p>“{t.quote}”</p>
          </blockquote>
          <figcaption className="text-body mt-6 text-text-2">
            <span className="font-semibold text-text">{t.name}</span>, {t.role}, {t.company}
          </figcaption>
        </figure>
      ))}
    />
  );
}

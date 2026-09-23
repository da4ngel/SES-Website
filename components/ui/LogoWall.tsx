/**
 * Client logo wall. Text placeholders for now (see public/images/README.md).
 * When real SVG logos arrive: render <img> inside each <li> instead of the name,
 * and add `grayscale transition-[filter] duration-300 hover:grayscale-0` to it —
 * `grayscale`/`hover:grayscale-0` only affect bitmaps/images, not text, so they're
 * left off here rather than sitting on the text with zero visual effect.
 */
export function LogoWall({ names }: { names: string[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14" aria-label="Clients">
      {names.map((n) => (
        <li key={n} className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-text-2 transition-colors duration-300 hover:text-accent">
          {n}
        </li>
      ))}
    </ul>
  );
}

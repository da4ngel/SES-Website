/**
 * Client logo wall. Grayscale by default, full color on hover.
 * Text placeholders for now. When SVGs arrive, render <img> inside each <li>
 * and keep the grayscale/hover classes (see public/images/README.md).
 */
export function LogoWall({ names }: { names: string[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14" aria-label="Clients">
      {names.map((n) => (
        <li
          key={n}
          className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-text-2 grayscale transition-colors duration-300 hover:text-accent hover:grayscale-0"
        >
          {n}
        </li>
      ))}
    </ul>
  );
}

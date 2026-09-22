import { Heading } from "./Heading";

type Props = {
  eyebrow?: string;
  title: string;
  subhead?: string;
  children?: React.ReactNode;
};

/** Top of every inner page: one h1, one sentence. Static (no reveal) so it paints instantly. */
export function PageHero({ eyebrow, title, subhead, children }: Props) {
  return (
    <section className="pb-16 pt-20 md:pb-20 md:pt-28">
      <div className="container-page">
        <Heading as="h1" size="display" eyebrow={eyebrow} title={title} subhead={subhead} />
        {children && <div className="mt-10 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}

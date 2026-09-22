import { seo } from "@/content/seo";
import { formatDate, news } from "@/content/news";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({ ...seo.news, path: "/news/" });

export default function NewsPage() {
  const [lead, ...rest] = news;
  return (
    <>
      <PageHero eyebrow="News" title="What's new at SES." subhead="Events, awards, reports and ideas." />

      <Section tone="alt" aria-label="Posts" className="pt-16! md:pt-20!">
        <Reveal>
          <Card href={`/news/${lead.slug}/`} radius="lg" className="p-8 md:p-12">
            <p className="text-caption font-medium text-accent">
              {lead.tag} · <time dateTime={lead.date}>{formatDate(lead.date)}</time>
            </p>
            <h2 className="text-display mt-4 max-w-[20ch] text-text">{lead.title}</h2>
            <p className="text-subhead mt-4 max-w-[40rem] text-text-2">{lead.summary}</p>
          </Card>
        </Reveal>

        <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} index={i % 3}>
              <Card href={`/news/${p.slug}/`} radius="lg" className="flex h-full flex-col p-7">
                <p className="text-caption font-medium text-accent">
                  {p.tag} · <time dateTime={p.date}>{formatDate(p.date)}</time>
                </p>
                <h2 className="text-title mt-3 text-text">{p.title}</h2>
                <p className="text-body mt-2 text-text-2">{p.summary}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}

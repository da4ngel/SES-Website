import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatDate, getPost, news } from "@/content/news";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.summary, path: `/news/${p.slug}/` });
}

export default async function NewsPostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const more = news.filter((n) => n.slug !== p.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.summary,
    datePublished: p.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/images/ses-logo-original.svg` } },
    mainEntityOfPage: `${site.url}/news/${p.slug}/`,
  };
  const breadcrumb = breadcrumbJsonLd([
    { name: "News", path: "/news/" },
    { name: p.title, path: `/news/${p.slug}/` },
  ]);

  return (
    <article className="pb-24 pt-20 md:pb-32 md:pt-28">
      <div className="container-page max-w-[44rem]">
        <p className="text-caption font-medium text-accent">
          {p.tag} · <time dateTime={p.date}>{formatDate(p.date)}</time>
        </p>
        <h1 className="text-display mt-4 text-text">{p.title}</h1>
        <p className="text-subhead mt-5 text-text-2">{p.summary}</p>

        <div className="mt-12 space-y-8 border-t border-hairline pt-10">
          {p.body.map((b, i) => (
            <section key={i}>
              {b.heading && <h2 className="text-title mb-3 text-text">{b.heading}</h2>}
              <p className="text-body text-text">{b.text}</p>
            </section>
          ))}
        </div>

        <p className="text-caption mt-12 text-text-2">
          <a href={p.source} className="underline underline-offset-4 hover:text-text" rel="noopener">
            Read the original post
          </a>
        </p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {more.map((m) => (
            <Card key={m.slug} href={`/news/${m.slug}/`} radius="md" className="p-6">
              <p className="text-caption text-text-2">{formatDate(m.date)}</p>
              <p className="text-body mt-2 font-semibold text-text">{m.title}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/news/" variant="ghost">
            All news ›
          </Button>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </article>
  );
}

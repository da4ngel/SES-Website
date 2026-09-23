import { seo } from "@/content/seo";
import { assetManagement } from "@/content/technology";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMetadata({ ...seo.assetManagement, path: "/technology/asset-management/" });

export default function AssetManagementPage() {
  const a = assetManagement;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Technology", path: "/technology/" },
              { name: "Asset management", path: "/technology/asset-management/" },
            ]),
          ),
        }}
      />
      <PageHero eyebrow={a.eyebrow} title={a.headline} subhead={a.subhead}>
        <Button href="/solutions/smartpm/" size="lg" variant="secondary">
          See SmartPM
        </Button>
      </PageHero>

      <Section tone="alt" aria-label="Asset lifecycle" className="pt-16! md:pt-20!">
        <ul className="grid gap-4 sm:grid-cols-2">
          {a.points.map((p, i) => (
            <Reveal as="li" key={p.title} index={i % 2}>
              <Card radius="lg" className="h-full p-7 md:p-8">
                <h2 className="text-title text-text">{p.title}</h2>
                <p className="text-body mt-2 text-text-2">{p.line}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="realtime-title">
        <Reveal>
          <Heading id="realtime-title" title="In real time." size="headline" />
        </Reveal>
        <Reveal className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {a.realtime.map((p) => (
              <li key={p} className="text-body rounded-full bg-surface-2 px-5 py-2.5 text-text ring-1 ring-inset ring-hairline">
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <FinalCta />
    </>
  );
}

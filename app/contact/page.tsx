import { seo } from "@/content/seo";
import { bookCall, contactPage, programs, support } from "@/content/contact";
import { contactForm } from "@/content/forms";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Form } from "@/components/forms/Form";

export const metadata = pageMetadata({ ...seo.contact, path: "/contact/" });

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={contactPage.eyebrow} title={contactPage.headline} subhead={contactPage.subhead} />

      <Section tone="alt" id="book" aria-labelledby="book-title" className="pt-16! md:pt-20!">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card radius="lg" className="p-6 sm:p-8 md:p-10">
            <h2 id="book-title" className="text-headline text-text">
              {bookCall.headline}
            </h2>
            <p className="text-body mt-2 text-text-2">{bookCall.line}</p>
            <div className="mt-8">
              <Form schema={contactForm} />
            </div>
          </Card>

          <div className="flex flex-col gap-6">
            <Card radius="lg" className="p-6 sm:p-8">
              <h2 className="text-title text-text">Call or email</h2>
              <ul className="text-body mt-4 space-y-3 text-text-2">
                <li>
                  <a href={site.phone.href} className="inline-block py-1 font-medium text-text hover:text-accent">
                    {site.phone.display}
                  </a>
                  <span className="block text-caption">Sales: ext. {site.phone.salesExt}</span>
                </li>
                <li>
                  <CopyEmail email={site.email.sales} />
                </li>
              </ul>
            </Card>

            <Card radius="lg" className="p-6 sm:p-8">
              <h2 className="text-title text-text">{support.headline}</h2>
              <p className="text-body mt-2 text-text-2">{support.line}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button href={site.portalUrl} variant="secondary">
                  Log in
                </Button>
              </div>
              <p className="text-body mt-4 text-text-2">
                <CopyEmail email={site.email.support} />
              </p>
            </Card>

            {programs.map((p) => (
              <Card key={p.href} href={p.href} radius="lg" className="p-6 sm:p-8">
                <h2 className="text-title text-text">{p.title}</h2>
                <p className="text-body mt-2 text-text-2">{p.line}</p>
                <p className="text-body mt-4 font-medium text-accent" aria-hidden="true">
                  Learn more ›
                </p>
              </Card>
            ))}

            <Card radius="lg" className="p-6 sm:p-8">
              <h2 className="text-title text-text">Visit</h2>
              <address className="text-body mt-2 not-italic text-text-2">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </address>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

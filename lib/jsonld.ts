import { site } from "@/content/site";

/** schema.org Organization, rendered once in the root layout. */
export function organizationJsonLd() {
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/images/ses-logo-original.svg`,
    slogan: site.tagline,
    description: site.description,
    email: site.email.sales,
    telephone: "+1-617-564-4800",
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", telephone: "+1-617-564-4800", email: site.email.sales },
      { "@type": "ContactPoint", contactType: "customer support", email: site.email.support },
    ],
    sameAs: site.social.map((s) => s.href),
  };
}

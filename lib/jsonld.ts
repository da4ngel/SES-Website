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
    // Google's structured-data guidelines require a raster format here, not SVG
    // (see app/logo.png/route.tsx).
    logo: `${site.url}/logo.png`,
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

/**
 * schema.org WebSite, rendered once in the root layout. No SearchAction: the
 * site has no search feature, and declaring one that doesn't exist would be
 * fabricated structured data.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
}

/** schema.org BreadcrumbList for a nested route. `path` segments exclude the domain, e.g. ["Technology", "How it works"]. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** schema.org Service for one of the 7 solutions, from its own content/solutions.ts entry. */
export function serviceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "US",
  };
}

/** schema.org Review markup for the already-published, attributed testimonials in content/results.ts. */
export function reviewJsonLd(testimonials: { quote: string; name: string; role: string; company: string }[]) {
  return testimonials.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: t.quote,
    author: { "@type": "Person", name: t.name, jobTitle: t.role, worksFor: { "@type": "Organization", name: t.company } },
    itemReviewed: { "@type": "Organization", name: site.name },
  }));
}

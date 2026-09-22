/**
 * Site-wide facts: brand, contact, address, socials, navigation.
 * Edit wording here. Components read from this file.
 */

export const site = {
  name: "Save Energy Systems",
  shortName: "SES",
  tagline: "Be smart, take control.",
  url: "https://saveenergysystems.com",
  description:
    "Smart HVAC energy management for multi-site businesses. Save up to 30% on energy and catch failures before they happen.",

  portalUrl: "https://dashboard.saveenergysystems.com",

  phone: { display: "(617) 564-4800", href: "tel:+16175644800", salesExt: "2" },
  email: {
    sales: "sales@saveenergysystems.com",
    support: "support@saveenergysystems.com",
  },
  address: {
    street: "One Research Drive, Suite 100A",
    city: "Westborough",
    region: "MA",
    postalCode: "01581",
    country: "US",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/save-energy-systems-inc-" },
    { label: "YouTube", href: "https://www.youtube.com/@SaveEnergySystems" },
    { label: "Facebook", href: "https://www.facebook.com/ses01581" },
  ],
} as const;

/** Header links (order = display order) */
export const nav = {
  links: [
    { label: "Technology", href: "/technology/" },
    { label: "Solutions", href: "/solutions/" },
    { label: "Results", href: "/results/" },
    { label: "SES Pro", href: "/ses-pro/" },
    { label: "About", href: "/about/" },
  ],
  login: { label: "Log in", href: site.portalUrl },
  cta: { label: "Book a call", href: "/contact/#book" },
} as const;

export const footer = {
  blurb: "Smart HVAC control for businesses with many sites.",
  columns: {
    company: [
      { label: "Technology", href: "/technology/" },
      { label: "Results", href: "/results/" },
      { label: "News", href: "/news/" },
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
    ],
    programs: [
      { label: "Pilot Program", href: "/pilot/" },
      { label: "SES Pro for contractors", href: "/ses-pro/" },
      { label: "ESG impact", href: "/news/hvac-esg-impact-report-2025/" },
    ],
  },
  legal: [{ label: "Privacy", href: "/privacy/" }],
  copyright: `© ${new Date().getFullYear()} Save Energy Systems, Inc.`,
} as const;

/**
 * Company facts: scale, awards, ESG impact. Used on /about and the homepage scale strip.
 * Source: saveenergysystems.com homepage counters, the ESG Impact Report 2025 and the award posts.
 */

/** Homepage + about scale strip */
export const scale = [
  { value: "25M+", label: "Sq ft managed" },
  { value: "100K+", label: "Assets managed" },
  { value: "1,100+", label: "Locations" },
  { value: "2012", label: "In the field since" },
];

export const managedServices = {
  eyebrow: "Managed services",
  headline: "An extension of your team.",
  subhead: "Real HVAC experts watching your sites, so you spend 50% less time on them.",
  points: [
    { title: "Live support", line: "HVAC troubleshooting from people who know your sites." },
    { title: "Service handled", line: "Calls placed, jobs verified, preventive checks done." },
    { title: "Faster fixes", line: "Lower mean time to repair, and long-term issues solved." },
  ],
  cta: { label: "Remote Facility Management", href: "/solutions/remote-facility-management/" },
};

/**
 * ESG Impact Report 2025.
 * TODO: verify figures with SES (from the crawl summary; the live page couldn't be re-read).
 */
export const esg = {
  eyebrow: "Impact",
  headline: "Savings the planet notices.",
  subhead: "From our 2025 HVAC ESG Impact Report, across our fitness clients.",
  stats: [
    { value: "35,371", label: "Metric tons CO₂e saved each year through efficiency" },
    { value: "250", label: "Truck rolls avoided each year" },
    { value: "15%", label: "Longer equipment life" },
    { value: "1,000", label: "Thermostats recycled each year" },
  ],
  note: "Combined corporate (11,382 MT) and franchise (23,989 MT) clubs. Supports Scope 1, 2 and 3 reporting.",
  minorityOwned: "SES is a minority-owned business.",
};

export const awards = [
  {
    year: "2025",
    title: "MassCEC InnovateMass award",
    line: "A $150,000 grant, one of six companies funded, to pilot smart duct dampers in Greater Boston homes.",
    href: "/news/innovatemass-award/",
  },
  {
    year: "2025",
    title: "Clean Energy Alliance partnership",
    line: "A DOE–CEA award funding mentoring through North Shore InnoVentures.",
    href: "/news/clean-energy-alliance/",
  },
];

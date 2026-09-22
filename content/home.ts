/**
 * Homepage copy, section by section (top to bottom).
 */

export const hero = {
  eyebrow: "Save Energy Systems",
  headline: "Your HVAC, thinking ahead.",
  subhead: "Save up to 30% on energy across every site you run.",
  primaryCta: { label: "Book a call", href: "/contact/#book" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  visualAlt:
    "Illustration of a building with three rooftop HVAC units, each fitted with an SES controller connected to the cloud.",
};

export const bigNumbers = {
  eyebrow: "The results",
  headline: "Numbers that pay for themselves.",
  stats: [
    { value: 30, prefix: "", suffix: "%", label: "Lower energy costs", line: "Up to 30% off your bill." },
    { value: 75, prefix: "", suffix: "%", label: "Fewer equipment failures", line: "Up to 75% fewer breakdowns." },
    // Displayed as "3–18 mo". The count-up animates the 18.
    { value: 18, prefix: "3–", suffix: " mo", label: "Average return on investment", line: "Average payback in 3 to 18 months." },
  ],
};

export const storySection = {
  // intro copy lives in content/howItWorks.ts
  cta: { label: "More on how it works", href: "/technology/how-it-works/" },
};

export const solutionsSection = {
  eyebrow: "Solutions",
  headline: "One platform. Seven ways to save.",
  subhead: "Start with one. Add the rest as you grow.",
  cta: { label: "All solutions", href: "/solutions/" },
};

export const platformPeek = {
  eyebrow: "The platform",
  headline: "Every site, at a glance.",
  subhead: "One dashboard for energy, comfort and equipment health.",
  disclaimer: "Illustrative data",
  // Sample dashboard values: clearly labeled as illustrative on the page.
  // TODO: swap for real anonymized figures if SES can share them.
  tiles: {
    saved: { label: "Energy saved", value: "28%", note: "vs. last year" },
    sites: { label: "Active sites", value: "124", note: "all online" },
    faults: { label: "Faults caught", value: "7", note: "this month" },
  },
  alerts: [
    { unit: "RTU-3 · Store 41", issue: "Compressor short-cycling", tag: "Flagged early" },
    { unit: "RTU-1 · Store 18", issue: "Dirty filter detected", tag: "Scheduled" },
    { unit: "RTU-2 · Store 7", issue: "Economizer stuck open", tag: "Resolved" },
  ],
};

export const socialProof = {
  eyebrow: "Customers",
  headline: "Trusted across 1,100+ locations.",
  subhead: "Gyms, dealerships, hotels and more, in five industries.",
};

export const finalCta = {
  headline: "Start with a pilot.",
  subhead: "Try SES at a few sites. See the savings before you scale.",
  primary: { label: "Book a call", href: "/contact/#book" },
  secondary: { label: "About the pilot", href: "/pilot/" },
};

export const resultsTeaser = {
  eyebrow: "Results",
  headline: "Proof from real buildings.",
  // Slugs from content/caseStudies.ts, in display order
  slugs: ["st-michaels-parish", "gengras", "sheraton-stamford"],
  cta: { label: "All results", href: "/results/" },
};

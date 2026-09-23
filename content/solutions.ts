/**
 * The 7 solutions. One entry = one card on the homepage bento,
 * one row on /solutions, and one page at /solutions/[slug].
 * `icon` must be a key in components/ui/Icon.tsx.
 * `sections` are optional deep-dive blocks rendered in order on the solution page
 * (see components/solutions/SolutionSections.tsx). Facts come from saveenergysystems.com.
 */

export type IconName =
  | "scan"
  | "savings"
  | "wrench"
  | "remote"
  | "gauge"
  | "wind"
  | "users"
  | "zones"
  | "sunrise"
  | "activity"
  | "clock";

export type SolutionSection =
  | { kind: "split"; eyebrow: string; headline: string; line: string; points?: string[] }
  | { kind: "compare"; headline: string; columns: [string, string]; rows: { label: string; a: string; b: string }[] }
  | { kind: "story"; eyebrow: string; headline: string; lines: string[]; callout: { value: string; label: string } }
  | { kind: "stack"; headline: string; line?: string; layers: { title: string; line: string }[] }
  | { kind: "steps"; headline: string; steps: { title: string; line: string }[] }
  | { kind: "beforeAfter"; headline: string; pairs: { before: string; after: string }[] }
  | { kind: "groups"; headline: string; groups: { title: string; points: string[] }[] };

type Solution = {
  slug: string;
  icon: IconName;
  /** 3–5 words */
  title: string;
  /** Product name used on the old site, if any (e.g. SESAirQ) */
  product?: string;
  /** One line for cards */
  line: string;
  /** Page hero */
  headline: string;
  subhead: string;
  /** Short plain-language explainer (max 2 sentences) */
  intro: string;
  benefits: { title: string; line: string }[];
  /** Real brand stat to feature on the page, if any */
  stat?: { value: string; label: string };
  sections?: SolutionSection[];
  download?: { label: string; href: string };
  /** Related case study slug (content/caseStudies.ts) */
  caseStudy?: string;
};

export const solutions: Solution[] = [
  {
    slug: "fault-detection",
    icon: "scan",
    title: "Fault Detection & Diagnostics",
    line: "AI spots problems months before they become failures.",
    headline: "Catch failures before they happen.",
    subhead: "Fault Detection & Diagnostics (FDD) turns HVAC from emergency spend into a planned cost.",
    intro:
      "Sensors on each rooftop unit stream data to our cloud. AI reads what the thermostat can't see and flags parts drifting toward a breakdown.",
    benefits: [
      { title: "Months of warning", line: "Failing parts surface long before a unit quits." },
      { title: "Hidden data, read", line: "Supply-air temperature and cooling stages, not just room temperature." },
      { title: "Planned, not urgent", line: "Emergency repairs become scheduled maintenance." },
    ],
    stat: { value: "75%", label: "fewer equipment failures, up to" },
    sections: [
      {
        kind: "split",
        eyebrow: "The problem",
        headline: "Quiet on the floor. Failing on the roof.",
        line: "Without continuous data, units run until they break. The result is wasted energy, unhappy tenants and emergency calls.",
      },
      {
        kind: "split",
        eyebrow: "The foundation",
        headline: "Built on data you already have.",
        line: "Since 2012, SES has deployed its own DLC hardware across 1,100+ locations in five industries. FDD runs on top of it. There's no extra system to install.",
      },
      {
        kind: "compare",
        headline: "From watching screens to AI that thinks ahead.",
        columns: ["Manual monitoring", "SES automated FDD"],
        rows: [
          { label: "Trigger", a: "A visible temperature swing (over 2°)", b: "Tiny performance dips at unit startup" },
          { label: "Context", a: "Whatever's on the dashboard now", b: "Weather, history and similar units" },
          { label: "Speed", a: "Only when someone notices", b: "Instant, every run cycle" },
          { label: "Result", a: "A faster emergency repair", b: "Costs avoided before they happen" },
        ],
      },
      {
        kind: "story",
        eyebrow: "Anatomy of a catch",
        headline: "The room felt fine. Unit 3 didn't.",
        lines: [
          "Mild weather outside, and the zone was comfortable.",
          "But over 20 minutes of cooling, the supply air barely cooled: a drop of only 1–2°.",
          "The AI flagged a failing compressor months before anyone in the building would have noticed.",
        ],
        callout: { value: "1–2°", label: "supply-air drop over 20 minutes" },
      },
      {
        kind: "stack",
        headline: "The complete stack.",
        line: "Catch a likely fault in March, and you avoid an emergency in July.",
        layers: [
          { title: "Multi-agent AI", line: "Fault detection and predictive cost avoidance." },
          { title: "Demand control", line: "About 30% less energy, right away." },
          { title: "DLC hardware", line: "The physical connection that collects the data." },
        ],
      },
    ],
    caseStudy: "gengras",
  },
  {
    slug: "hvac-savings",
    icon: "savings",
    title: "HVAC Savings",
    line: "Cut energy costs without replacing equipment.",
    headline: "Save up to 30% on energy.",
    subhead: "The patented DLC makes the units you already own run smarter.",
    intro:
      "The Demand Limiting Controller (DLC) coordinates your units so they never all spike at once. You pay less for the same comfort.",
    benefits: [
      { title: "No rip and replace", line: "Installs on your existing rooftop units." },
      { title: "Lower peak demand", line: "Units take turns instead of piling on." },
      { title: "Fast payback", line: "Average ROI lands in 3 to 18 months." },
    ],
    stat: { value: "30%", label: "lower energy costs, up to" },
    sections: [
      {
        kind: "groups",
        headline: "What does the saving.",
        groups: [
          { title: "Demand management", points: ["Demand response", "Peak-hour optimization: pre-cool or pre-heat off-peak", "Smart scheduling by occupancy and time of day"] },
          { title: "Advanced Rooftop Control (ARC)", points: ["Turns conventional units into intelligent ones", "Digital economizer controls", "CO₂-based demand-controlled ventilation"] },
          { title: "Works with your BMS", points: ["Adds AI optimization to an existing BMS", "Supports industry-standard protocols", "Central control of new or existing systems"] },
        ],
      },
    ],
    caseStudy: "fitness-franchise",
  },
  {
    slug: "smartpm",
    icon: "wrench",
    title: "SmartPM",
    product: "SmartPM™",
    line: "Maintenance based on real wear, not the calendar.",
    headline: "Cut out the guesswork.",
    subhead: "AI-driven predictive maintenance, with hands-on service every quarter.",
    intro:
      "SmartPM sensors plus quarterly visits plus AI watching every unit. Filters, coils and belts get serviced, and it's all documented online.",
    benefits: [
      { title: "Fewer failures", line: "Up to 75% fewer equipment failures." },
      { title: "Photo reports", line: "Every quarterly visit is documented online." },
      { title: "Predictive alerts", line: "Know what needs attention before it breaks." },
    ],
    stat: { value: "75%", label: "fewer equipment failures, up to" },
    sections: [
      {
        kind: "steps",
        headline: "How SmartPM works.",
        steps: [
          { title: "Inspect and install", line: "Our technicians install SmartPM sensors and inspect every RTU." },
          { title: "Quarterly service", line: "Filters replaced, coils cleaned, belts checked, all documented online." },
          { title: "Maximize savings", line: "Pair it with the SES energy platform for the biggest return." },
          { title: "See everything", line: "Simple dashboards, total visibility." },
        ],
      },
      {
        kind: "beforeAfter",
        headline: "Before and after SmartPM.",
        pairs: [
          { before: "Wasted spend", after: "Smarter maintenance" },
          { before: "Unreliable performance", after: "Peak efficiency" },
          { before: "Costly breakdowns", after: "Lower repair bills" },
        ],
      },
    ],
    download: {
      label: "SmartPM overview (PDF)",
      href: "https://saveenergysystems.com/wp-content/uploads/2025/10/SES_0001_SmartPM%E2%84%A2-PL-Solution-Overview-Sheet.pdf",
    },
  },
  {
    slug: "remote-facility-management",
    icon: "remote",
    title: "Remote Facility Management",
    product: "SES Virtual FM",
    line: "Every site, one screen, from anywhere.",
    headline: "Cut facility time in half.",
    subhead: "A remote team and one dashboard for every location.",
    intro:
      "Our managed services team gives you expert oversight, real-time diagnostics and proactive maintenance. No on-site facility manager needed.",
    benefits: [
      { title: "Virtual facility manager", line: "A dedicated partner with strategies built for your sites." },
      { title: "Monitoring and diagnostics", line: "Experts watching your sites through the busy hours." },
      { title: "Half the legwork", line: "Spend 50% less time managing facilities." },
    ],
    stat: { value: "50%", label: "less time on facility management" },
    sections: [
      {
        kind: "groups",
        headline: "What the service includes.",
        groups: [
          { title: "Managed services", points: ["Live support with HVAC troubleshooting", "Service calls placed and verified", "Long-term HVAC issues resolved", "Faster repairs (lower MTTR)"] },
          { title: "Asset management", points: ["Maintenance and monitoring strategies", "Health checks on every unit", "Performance and maintenance reports"] },
          { title: "Consulting", points: ["Energy strategy", "Upgrade planning", "Operational improvements"] },
        ],
      },
    ],
    caseStudy: "sheraton-stamford",
  },
  {
    slug: "sensors-metering",
    icon: "gauge",
    title: "Sensors & Metering",
    line: "Know exactly where every kilowatt goes.",
    headline: "Measure what matters.",
    subhead: "Sensors and meters turn every building into live data.",
    intro:
      "We monitor HVAC, refrigeration, lighting and equipment. You see temperature, usage and runtime in real time.",
    benefits: [
      { title: "Energy visibility", line: "Usage by site, circuit and unit." },
      { title: "Peak control", line: "The DLC trims demand spikes automatically." },
      { title: "Proof of savings", line: "Metered results, not estimates." },
    ],
    sections: [
      {
        kind: "groups",
        headline: "Four ways to measure.",
        groups: [
          { title: "Energy metering", points: ["Energy visibility", "Demand management", "Better asset performance"] },
          { title: "Equipment monitoring", points: ["Temperature, vibration and status", "Predictive alerts", "Usage analytics"] },
          { title: "Refrigeration", points: ["Precise temperature control", "Instant alerts to prevent spoilage", "Food-safety compliance"] },
          { title: "Lighting", points: ["Occupancy-based control", "Daylight harvesting", "Central scheduling by zone"] },
        ],
      },
    ],
  },
  {
    slug: "indoor-air-quality",
    icon: "wind",
    title: "Indoor Air Quality",
    product: "SESAirQ",
    line: "Healthier air your members and staff can feel.",
    headline: "Air people can feel good about.",
    subhead: "SESAirQ tracks and improves the air in every location.",
    intro:
      "Sensors measure particulates, CO₂, VOCs and humidity in each zone. Ventilation and filtration adjust automatically when levels drift.",
    benefits: [
      { title: "Always measured", line: "Air quality tracked zone by zone, in real time." },
      { title: "Automatic response", line: "Ventilation adjusts before anyone notices." },
      { title: "Healthy humidity", line: "Kept in range to prevent mold and mildew." },
    ],
    sections: [
      {
        kind: "groups",
        headline: "What SESAirQ watches.",
        groups: [
          { title: "Pollutants", points: ["Particulate matter", "VOCs", "Dust, mold spores and allergens"] },
          { title: "Ventilation", points: ["CO₂-based fresh air", "Smart ventilation control", "Advanced filtration"] },
          { title: "Alerts", points: ["Custom alerts", "Remote monitoring", "Scales from small offices to large buildings"] },
        ],
      },
    ],
  },
  {
    slug: "occupancy-comfort",
    icon: "users",
    title: "Occupancy-Based Comfort",
    product: "SES SetPoint IQ",
    line: "Comfort follows people, not a fixed schedule.",
    headline: "Comfort where people are.",
    subhead: "SetPoint IQ heats and cools the spaces in use, and eases off the rest.",
    intro:
      "Occupancy sensors tell the system which zones are busy. Empty spaces stop burning energy.",
    benefits: [
      { title: "Real-time detection", line: "Knows which zones are occupied, right now." },
      { title: "Per-zone setpoints", line: "Temperature and lighting targets for every space." },
      { title: "Hands off", line: "Adjusts on its own, all day." },
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

/**
 * /news and /news/[slug]. Posts from the old blog, rewritten short.
 * The case-study posts (St. Michael's, EDGE, the fitness franchise) live under /results instead.
 * `source` links the original post.
 */

export type NewsPost = {
  slug: string;
  date: string; // ISO
  tag: "Event" | "Award" | "Report" | "Insight";
  title: string;
  summary: string;
  body: { heading?: string; text: string }[];
  source: string;
};

export const news: NewsPost[] = [
  {
    slug: "pfifc-frisco-2026",
    date: "2026-04-29",
    tag: "Event",
    title: "AI-driven energy optimization at PFIFC Frisco 2026",
    summary: "SES joined Planet Fitness franchisees in Frisco, May 5–8, to talk AI energy optimization and SmartPM.",
    body: [
      { text: "SES attended the Planet Fitness Independent Franchisee Conference (PFIFC) in Frisco, May 5–8, 2026." },
      { heading: "What we talked about", text: "AI-driven energy optimization, SmartPM predictive maintenance, HVAC intelligence and energy management systems." },
      { text: "Often the most valuable improvements start with understanding how a building is operating today." },
    ],
    source: "https://saveenergysystems.com/2026/04/big-ideas-smarter-buildings-talking-ai-driven-energy-optimization-at-pfifc-frisco2026/",
  },
  {
    slug: "new-york-build-2026-ll97",
    date: "2026-03-16",
    tag: "Event",
    title: "Talking Local Law 97 at New York Build 2026",
    summary: "HVAC optimization is one of the fastest paths to LL97 compliance, and emissions limits tighten again in 2030.",
    body: [
      { text: "SES was at New York Build on March 18–19, 2026, talking about Local Law 97 and HVAC optimization." },
      { heading: "Why HVAC first", text: "HVAC optimization typically cuts HVAC energy by 15 to 30 percent, without replacing equipment. In one 180,000 sq ft Manhattan building, HVAC-related energy use fell 31 percent." },
      { heading: "Works with any BMS", text: "The SES platform is BMS-agnostic, so it layers onto the systems New York buildings already run." },
    ],
    source: "https://saveenergysystems.com/2026/03/new-york-build-2026-ll97-hvac-optimization/",
  },
  {
    slug: "hvac-esg-impact-report-2025",
    date: "2025-10-20",
    tag: "Report",
    title: "HVAC ESG Impact Report 2025",
    summary: "How smarter HVAC control cuts emissions, refrigerant leaks and truck rolls across our fitness clients.",
    body: [
      { heading: "Energy", text: "Up to 30% HVAC electricity and gas savings. That's 11,382 metric tons of CO₂e a year saved at corporate clubs and 23,989 at franchise clubs." },
      { heading: "Refrigerant", text: "Less runtime means fewer leaks: 255 and 445 metric tons of CO₂e saved per year at corporate and franchise clubs." },
      { heading: "Operations", text: "81 and 169 truck rolls avoided per year, equipment that lasts 15% longer, 80% less wiring and 1,000 thermostats recycled each year." },
      { text: "SES is a minority-owned business, and the platform supports Scope 1, 2 and 3 reporting." },
    ],
    source: "https://saveenergysystems.com/2025/10/hvac-esg-impact-report-2025/",
  },
  {
    slug: "smartpm-vs-preventive-maintenance",
    date: "2025-10-10",
    tag: "Insight",
    title: "SmartPM vs. traditional preventive maintenance",
    summary: "Calendar-based maintenance guesses. SmartPM uses IoT sensors and AI to know.",
    body: [
      { text: "Traditional preventive maintenance services every unit on a fixed schedule, whether it needs it or not." },
      { heading: "The difference", text: "SmartPM is powered by IoT sensors and AI monitoring, so service goes where the data says it's needed, before a failure." },
      { text: "Cut out the guesswork." },
    ],
    source: "https://saveenergysystems.com/2025/10/smart-predictive-maintenance-smartpm-vs-traditional-hvac-preventive-maintenance/",
  },
  {
    slug: "innovatemass-award",
    date: "2025-07-16",
    tag: "Award",
    title: "SES receives an InnovateMass award from MassCEC",
    summary: "A $150,000 grant to pilot wireless, battery-powered duct dampers in Greater Boston homes.",
    body: [
      { text: "The Massachusetts Clean Energy Center (MassCEC) selected SES as one of six companies for its InnovateMass program, with a $150,000 grant." },
      { heading: "The project", text: "Wireless, battery-powered in-line duct dampers, piloted in homes across Greater Boston with partners Next Step Living and Building 36 Technologies." },
    ],
    source: "https://saveenergysystems.com/2025/07/ses-receives-innovatemass-award-from-mass-cec/",
  },
  {
    slug: "clean-energy-alliance",
    date: "2025-07-16",
    tag: "Award",
    title: "Recognized by the Clean Energy Alliance",
    summary: "A DOE–CEA partnership award funds mentoring for SES through North Shore InnoVentures.",
    body: [
      { text: "A $25,000 DOE–Clean Energy Alliance award went to North Shore InnoVentures in Beverly, MA, to mentor SES." },
      { heading: "The support", text: "Marketing and sales tracking, independent product testing and target-market strategy, from a $1.2 million program funded by the American Recovery and Reinvestment Act." },
    ],
    source: "https://saveenergysystems.com/2025/07/recognized-by-the-clean-energy-alliance-in-new-partnership/",
  },
  {
    slug: "120-billion-in-savings",
    date: "2025-07-16",
    tag: "Insight",
    title: "$120 billion in savings over 10 years",
    summary: "Buildings use 40% of the world's energy. Efficiency is the biggest lever we have.",
    body: [
      { text: "Buildings use 40% of the world's energy and produce 21% of greenhouse gas emissions." },
      { heading: "The opportunity", text: "The Alliance Commission set a goal to double US energy efficiency by 2030. On-bill financing alone could save an estimated $120 billion over a decade." },
    ],
    source: "https://saveenergysystems.com/2025/07/120-billion-in-savings-in-10-years-with-energy-saving-technology/",
  },
];

export function getPost(slug: string) {
  return news.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

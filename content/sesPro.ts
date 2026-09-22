import type { IconName } from "./solutions";

/**
 * /ses-pro copy: the contractor/reseller program.
 * Source: saveenergysystems.com/reseller/ and /ses_pro_kit_application/ (verified 2026-09-22).
 */
export const sesPro = {
  eyebrow: "SES Pro",
  headline: "Smarter HVAC. Higher margins.",
  subhead: "A retrofit you can install in hours, and revenue that keeps coming.",
  numbers: [
    { value: "$10K–$12K", label: "Install revenue per location" },
    { value: "$1.5K–$3K", label: "Recurring revenue per site, per year" },
    { value: "20–30%", label: "HVAC energy cut for your clients" },
    { value: "30–50%", label: "Fewer callbacks" },
  ],
  trust: "Trusted by over 1,000 HVAC technicians nationwide, since 2012.",
  kit: {
    headline: "A free kit to start.",
    line: "Qualified contractors get a complete SES Pro kit, worth up to $10,000, with no upfront cost.",
    includes: [
      "Retrofit control system with wireless sensors",
      "Platform access and training",
      "Technical support and sales materials",
      "Contractor pricing on future orders",
      "Ongoing partner support",
    ],
  },
  why: [
    { icon: "zones" as IconName, title: "Plug-and-play retrofit", line: "Wireless and quick to install. No rip and replace." },
    { icon: "wrench" as IconName, title: "Any brand, any age", line: "Works with existing equipment. No special training." },
    { icon: "activity" as IconName, title: "SmartPM™ built in", line: "AI predictive maintenance, remote monitoring and alerts." },
    { icon: "remote" as IconName, title: "A mobile app for techs", line: "Voice notes, photos, video and automatic call transcripts." },
  ],
  callbacks: {
    headline: "Fewer truck rolls. Better margins.",
    line: "Every site avoids 10+ unnecessary service visits a year, so your crews go where they earn.",
  },
  targets: ["Retail", "Gyms", "Restaurants", "Banks", "Offices", "Municipal buildings", "Mixed use", "Older buildings"],
  // Text placeholders until partner logos arrive (see public/images/README.md)
  partners: [
    "Climatech HVAC Services",
    "Midwest Maintenance & Mechanical",
    "AEG Allied Energy Group",
    "Hutchinson",
    "Suburban",
    "Total Comfort Group",
    "AGS HVAC Services",
    "Joy's HVAC",
    "RiteTemp Mechanical Contractors",
    "Woodmart",
    "Valley Air Conditioning & Heating",
    "Energy One",
  ],
  formHeadline: "Become an SES Pro",
  formLine: "Qualify for your complimentary kit. We reply within 24 hours.",
};

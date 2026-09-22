/**
 * Social proof: client names and testimonials.
 * Case studies live in content/caseStudies.ts.
 */

/** Text placeholders until real SVG logos arrive (see public/images/README.md) */
export const clients = [
  "Planet Fitness",
  "Sheraton",
  "BMW",
  "Volvo",
  "YMCA",
  "Gengras Motor Cars",
  "EPIC Fitness",
  "Pearson Ford",
  "Flynn",
  "Cummings",
  "Grand Fitness",
  "NuCar",
  "Momentum Manufacturing Group",
  "Lyon Waugh",
  "Beehive Pros",
  // TODO: Bed Bath & Beyond appears on the old site. Keep it or drop it?
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

/** Exact wording from saveenergysystems.com */
export const testimonials: Testimonial[] = [
  {
    quote:
      "SES provides monitoring and management of our HVAC controls in a manner that is unmatched allowing me to spend my time on running my business… they are a most trusted partner.",
    name: "Jeremy Kilpatrick",
    role: "Managing Member",
    company: "MAK Fitness",
  },
  {
    quote:
      "We currently have SES running the HVAC at 63 of our locations. In addition to the energy cost savings, it helps reduce the wear on the RTUs, expanding the lifespan of the units and reducing our bills at the same time.",
    name: "Art Nichols",
    role: "VP, Facilities and Construction",
    company: "EPIC Fitness",
  },
  {
    quote:
      "Working with Save Energy Systems, I can see past performance and do basic diagnostics at any time without ever leaving my office. With the addition of air conditioning to our shops, having the Demand Limiting Controller in place has definitely helped us save in energy costs.",
    name: "Marc Rienow",
    role: "Director of Facilities",
    company: "Gengras Motor Cars",
  },
  {
    quote: "We saved energy and therefore saved money… a lot of money.",
    name: "Joseph Zummo",
    role: "Director of Engineering",
    company: "Sheraton Stamford Hotel",
  },
];

export const proofLine = "Trusted by 900+ Planet Fitness franchise locations.";

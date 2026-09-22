import { solutions } from "./solutions";

/**
 * Lead forms. Each schema renders with components/forms/Form.tsx.
 * Field options come from the current saveenergysystems.com forms.
 */

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "chips" | "textarea" | "checkbox";
  required?: boolean;
  /** Half width on larger screens (pairs side by side) */
  half?: boolean;
  options?: string[];
  autoComplete?: string;
  placeholder?: string;
};

export type FormSchema = {
  /** Sent to the backend so it knows which form this is */
  id: "contact" | "pilot" | "ses-pro";
  fields: FieldDef[];
  submitLabel: string;
  success: { headline: string; line: string; again: string };
  /** Preselect a field from a URL param, e.g. ?interest=pilot */
  prefill?: { param: string; field: string; map: Record<string, string> };
};

export const formErrors = {
  required: "Please fill this in.",
  choose: "Please choose an option.",
  email: "Please enter a valid email, like name@company.com.",
  phone: "Please enter a valid phone number.",
  consent: "Please agree so we can contact you.",
  network: "Couldn't send. Please try again, or email sales@saveenergysystems.com.",
};

const person: FieldDef[] = [
  { name: "firstName", label: "First name", type: "text", required: true, half: true, autoComplete: "given-name" },
  { name: "lastName", label: "Last name", type: "text", required: true, half: true, autoComplete: "family-name" },
  { name: "email", label: "Work email", type: "email", required: true, half: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", required: true, half: true, autoComplete: "tel" },
  { name: "company", label: "Company", type: "text", required: true, half: true, autoComplete: "organization" },
  { name: "jobTitle", label: "Job title", type: "text", required: true, half: true, autoComplete: "organization-title" },
];

const consent: FieldDef = {
  name: "consent",
  label: "I agree to be contacted by Save Energy Systems. You can unsubscribe at any time.",
  type: "checkbox",
  required: true,
};

const decisionRole: FieldDef = {
  name: "decisionRole",
  label: "Your role in the decision",
  type: "chips",
  required: true,
  options: ["Final decision maker", "Recommend or influence", "Evaluating options", "Research only"],
};

export const contactForm: FormSchema = {
  id: "contact",
  fields: [
    ...person,
    {
      name: "interest",
      label: "I'm interested in",
      type: "select",
      required: true,
      options: [...solutions.map((s) => s.title), "Pilot Program", "SES Pro (contractors)", "Other"],
    },
    { name: "message", label: "Message", type: "textarea", placeholder: "Number of sites, current setup, questions…" },
    consent,
  ],
  submitLabel: "Send",
  success: {
    headline: "Thanks. We'll be in touch.",
    line: "Someone from our team will reach out within one business day.", // TODO: confirm response time
    again: "Send another message",
  },
  prefill: {
    param: "interest",
    field: "interest",
    map: { pilot: "Pilot Program", reseller: "SES Pro (contractors)", "ses-pro": "SES Pro (contractors)" },
  },
};

export const pilotForm: FormSchema = {
  id: "pilot",
  fields: [
    ...person,
    {
      name: "buildingType",
      label: "Primary building type",
      type: "select",
      required: true,
      half: true,
      options: ["Office", "Retail", "Fitness / gym", "Healthcare", "Multifamily residential", "Warehouse / distribution", "Hospitality / hotel", "Mixed use", "Other"],
    },
    {
      name: "buildingCount",
      label: "Number of buildings",
      type: "select",
      required: true,
      half: true,
      options: ["1", "2–5", "6–10", "11–25", "26–50", "51+"],
    },
    {
      name: "buildingSize",
      label: "Typical building size",
      type: "select",
      required: true,
      half: true,
      options: ["Under 10,000 sq ft", "10,000–25,000 sq ft", "25,000–50,000 sq ft", "50,000–100,000 sq ft", "100,000–250,000 sq ft", "Over 250,000 sq ft"],
    },
    {
      name: "buildingAge",
      label: "Building age",
      type: "select",
      required: true,
      half: true,
      options: ["Under 5 years", "5–10 years", "10–20 years", "20–30 years", "Over 30 years"],
    },
    {
      name: "hvacType",
      label: "HVAC system",
      type: "chips",
      required: true,
      options: ["Rooftop units", "Split system", "VRF", "Chiller / boiler", "Package units", "Mixed", "Not sure"],
    },
    decisionRole,
    { name: "message", label: "Anything else we should know", type: "textarea" },
    consent,
  ],
  submitLabel: "Apply for the pilot",
  success: {
    headline: "Application received.",
    line: "We'll review your buildings and reply within one business day.", // TODO: confirm response time
    again: "Submit another building",
  },
};

export const sesProForm: FormSchema = {
  id: "ses-pro",
  fields: [
    ...person,
    { name: "serviceArea", label: "Primary service area", type: "text", required: true, half: true, placeholder: "e.g. Greater Boston" },
    {
      name: "trucks",
      label: "Service trucks",
      type: "select",
      required: true,
      half: true,
      options: ["1–2", "3–5", "6–10", "11–20", "20+"],
    },
    {
      name: "clients",
      label: "Active clients",
      type: "select",
      required: true,
      half: true,
      options: ["1–25", "26–50", "51–100", "101–250", "250+"],
    },
    {
      name: "years",
      label: "Years in business",
      type: "select",
      required: true,
      half: true,
      options: ["0–2", "3–5", "6–10", "11–20", "20+"],
    },
    {
      name: "sqft",
      label: "Square feet serviced",
      type: "select",
      required: true,
      half: true,
      options: ["Under 100K", "100K–250K", "250K–500K", "500K–1M", "1M+"],
    },
    {
      name: "revenue",
      label: "Annual revenue",
      type: "select",
      required: true,
      half: true,
      options: ["Under $500K", "$500K–$1M", "$1M–$2M", "$2M–$5M", "$5M+"],
    },
    decisionRole,
    { name: "message", label: "Anything else", type: "textarea" },
    consent,
  ],
  submitLabel: "Apply for SES Pro",
  success: {
    headline: "You're on the list.",
    line: "Our partner team replies within 24 hours.",
    again: "Submit another application",
  },
};

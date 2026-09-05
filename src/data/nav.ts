export type NavItem = { href: string; label: string; blurb?: string };

export const toolPages: NavItem[] = [
  {
    href: "/view-pdf-metadata",
    label: "View PDF metadata",
    blurb: "Inspect every property inside a PDF.",
  },
  {
    href: "/edit-pdf-metadata",
    label: "Edit PDF metadata",
    blurb: "Change the title, author, dates and more.",
  },
  {
    href: "/remove-pdf-metadata",
    label: "Remove PDF metadata",
    blurb: "Strip all identifying data in one click.",
  },
];

export const learnPages: NavItem[] = [
  {
    href: "/what-is-pdf-metadata",
    label: "What is PDF metadata?",
    blurb: "A plain-English introduction.",
  },
  {
    href: "/pdf-metadata-fields",
    label: "PDF metadata fields",
    blurb: "What each PDF property means.",
  },
  {
    href: "/how-it-works",
    label: "How it works",
    blurb: "Three steps, zero uploads.",
  },
  { href: "/features", label: "Features", blurb: "Everything the editor can do." },
  { href: "/faq", label: "PDF metadata FAQ", blurb: "Common questions, answered." },
];

export const companyPages: NavItem[] = [
  {
    href: "/about-us",
    label: "About us",
    blurb: "Why this tool exists, and what it stands for.",
  },
  {
    href: "/contact-us",
    label: "Contact us",
    blurb: "Questions, bugs and feature requests.",
  },
];

export const legalPages: NavItem[] = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms-and-conditions", label: "Terms & conditions" },
];

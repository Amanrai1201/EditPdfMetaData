export type NavItem = { href: string; label: string; blurb?: string };

export const toolPages: NavItem[] = [
  {
    href: "/view-pdf-metadata",
    label: "View metadata",
    blurb: "Inspect every property inside a PDF.",
  },
  {
    href: "/edit-pdf-metadata",
    label: "Edit metadata",
    blurb: "Change the title, author, dates and more.",
  },
  {
    href: "/remove-pdf-metadata",
    label: "Remove metadata",
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
    label: "Metadata field reference",
    blurb: "What each PDF property means.",
  },
  {
    href: "/how-it-works",
    label: "How it works",
    blurb: "Three steps, zero uploads.",
  },
  { href: "/features", label: "Features", blurb: "Everything the editor can do." },
  { href: "/faq", label: "FAQ", blurb: "Common questions, answered." },
];

export const legalPages: NavItem[] = [
  { href: "/privacy", label: "Privacy policy" },
];

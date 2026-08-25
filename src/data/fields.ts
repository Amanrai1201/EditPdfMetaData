export type MetaField = {
  label: string;
  key: string;
  type: string;
  what: string;
  why: string;
  example: string;
  privacy?: "high" | "medium" | "low";
};

export const metaFields: MetaField[] = [
  {
    label: "Title",
    key: "/Title",
    type: "Text",
    what: "The document's proper title. Distinct from the filename — a file called q3-final-v2.pdf can carry the title “Q3 Financial Report”.",
    why: "PDF readers show it in the window or tab instead of the filename, and document management systems index it. Setting it makes a document look finished and searchable.",
    example: "Q3 Financial Report",
    privacy: "low",
  },
  {
    label: "Author",
    key: "/Author",
    type: "Text",
    what: "The person or organisation credited with writing the document.",
    why: "Usually filled in automatically from your operating system or office suite account name, which means it often contains your real full name without you realising.",
    example: "Jane Doe",
    privacy: "high",
  },
  {
    label: "Subject",
    key: "/Subject",
    type: "Text",
    what: "A short description of what the document is about — effectively a one-line abstract.",
    why: "Improves findability in document libraries and gives colleagues context without opening the file.",
    example: "Quarterly results and forecast commentary",
    privacy: "low",
  },
  {
    label: "Keywords",
    key: "/Keywords",
    type: "Text (comma-separated)",
    what: "A list of search terms associated with the document.",
    why: "Indexed by desktop search, enterprise DMS platforms, and some site search engines. Useful for grouping documents that don't share words in their titles.",
    example: "finance, quarterly, 2026, forecast",
    privacy: "low",
  },
  {
    label: "Creator",
    key: "/Creator",
    type: "Text",
    what: "The application that produced the original document, before it became a PDF.",
    why: "Reveals your software stack — for example that a contract was drafted in a specific word processor, or a diagram came from a particular design tool.",
    example: "Microsoft Word",
    privacy: "medium",
  },
  {
    label: "Producer",
    key: "/Producer",
    type: "Text",
    what: "The software that performed the actual PDF conversion or last saved the file.",
    why: "Often exposes exact product and version strings, which can hint at an unpatched application or an organisation's licensing. Many tools silently overwrite this with their own name on save.",
    example: "macOS Quartz PDFContext",
    privacy: "medium",
  },
  {
    label: "Creation date",
    key: "/CreationDate",
    type: "Date",
    what: "When the PDF was first created, stored with a timezone offset.",
    why: "The timezone offset alone can narrow down your location, and the timestamp can contradict a claimed timeline — a common issue with documents submitted as evidence or to a deadline.",
    example: "2026-08-25 14:32 +05:30",
    privacy: "high",
  },
  {
    label: "Modification date",
    key: "/ModDate",
    type: "Date",
    what: "When the PDF was last changed.",
    why: "Shows that a document was revised after its stated date, and how recently it was touched. Frequently overlooked when back-dating a file.",
    example: "2026-08-25 18:04 +05:30",
    privacy: "high",
  },
  {
    label: "Trapped",
    key: "/Trapped",
    type: "Name — True, False, or Unknown",
    what: "Records whether the file has been through trapping, a prepress step that compensates for slight misregistration between colour plates on a printing press.",
    why: "Only meaningful in professional print production, where a printer may reject or re-process a file based on this flag. Safe to leave unset for everyday documents.",
    example: "Unknown",
    privacy: "low",
  },
  {
    label: "Custom properties",
    key: "any custom key",
    type: "Text",
    what: "Arbitrary key/value pairs that applications and organisations add to the Info dictionary beyond the nine standard entries.",
    why: "Often used for internal tracking — matter numbers, department codes, template versions, workflow IDs. These can expose internal naming conventions when a document is shared externally.",
    example: "CaseNumber: 2026-ADR-0148",
    privacy: "medium",
  },
  {
    label: "XMP packet",
    key: "/Metadata",
    type: "XML stream",
    what: "An XML block holding structured metadata under the Extensible Metadata Platform standard. It can duplicate the Info dictionary and add much more — editing history, rights statements, tool identifiers.",
    why: "Because it is a second, independent copy of the metadata, clearing the visible document properties can leave the XMP data behind. Any thorough cleanup has to handle both.",
    example: "<x:xmpmeta> … </x:xmpmeta>",
    privacy: "high",
  },
];

export const privacyLabels: Record<string, { text: string; cls: string }> = {
  high: {
    text: "Often identifying",
    cls: "border-error/30 bg-error-soft text-error-deep",
  },
  medium: {
    text: "Can reveal your tools",
    cls: "border-warning/40 bg-warning-soft text-warning-deep",
  },
  low: { text: "Low risk", cls: "" },
};

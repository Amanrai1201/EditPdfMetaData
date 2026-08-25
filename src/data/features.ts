export const icons: Record<string, string> = {
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 3 12V5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.6z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
  diff: '<path d="M12 3v18M5 8h14M5 16h14"/>',
  json: '<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1"/>',
  bolt: '<path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  lock: '<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
};

export type Feature = {
  title: string;
  body: string;
  icon: keyof typeof icons | string;
  home?: boolean;
};

export const features: Feature[] = [
  {
    home: true,
    icon: "eye",
    title: "See every field, not just a few",
    body: "The full document Info dictionary — title, author, subject, keywords, creator, producer, both dates and the Trapped flag — plus page count, file size, PDF version and encryption status.",
  },
  {
    home: true,
    icon: "trash",
    title: "One-click metadata removal",
    body: "Strip the entire Info dictionary and the XMP packet in a single action. Ideal before sharing a document publicly, filing it, or sending it to a client.",
  },
  {
    home: true,
    icon: "tag",
    title: "Custom properties",
    body: "Add, rename, or delete your own key/value pairs — Department, CaseNumber, Version, anything your workflow needs. Existing custom keys are detected automatically.",
  },
  {
    home: true,
    icon: "diff",
    title: "Review changes before saving",
    body: "A live change list shows exactly which fields you altered and their old → new values, so you never download a file you didn't mean to modify.",
  },
  {
    home: true,
    icon: "json",
    title: "Export & reuse metadata",
    body: "Download any PDF's metadata as JSON for records or auditing, then import that JSON to apply the same values to another document.",
  },
  {
    home: true,
    icon: "bolt",
    title: "Instant — no engine to load",
    body: "No multi-megabyte WebAssembly runtime to wait on. The page is interactive immediately and the PDF library loads only once you pick a file.",
  },
  {
    icon: "shield",
    title: "Private by architecture",
    body: "Not a policy promise — a structural fact. The site is static files and browser JavaScript, with no upload endpoint that could receive your document in the first place.",
  },
  {
    icon: "lock",
    title: "Your original is never touched",
    body: "Every action produces a new copy for download. The file you dropped in stays byte-for-byte identical on disk, so there is nothing to undo if you change your mind.",
  },
  {
    icon: "moon",
    title: "Light and dark, no account",
    body: "A considered interface in both themes, with no sign-up, no email capture, no watermarks, no daily quota, and no upsell.",
  },
];

export const homeFeatures = features.filter((f) => f.home);

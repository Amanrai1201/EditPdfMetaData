export type Faq = { q: string; a: string; cat: FaqCategory; home?: boolean };
export type FaqCategory = "Basics" | "Using the tool" | "Privacy & security" | "Troubleshooting";

export const faqCategories: FaqCategory[] = [
  "Basics",
  "Using the tool",
  "Privacy & security",
  "Troubleshooting",
];

export const faqs: Faq[] = [
  {
    cat: "Basics",
    home: true,
    q: "What is PDF metadata?",
    a: "PDF metadata is information stored inside a PDF that describes the document rather than forming part of its visible content. It typically includes the title, author, subject, keywords, the application that created the original document (Creator), the software that produced the PDF (Producer), creation and modification dates, and a Trapped flag used in professional printing. PDFs can also carry an XMP packet — an XML block with the same kind of information — and arbitrary custom properties.",
  },
  {
    cat: "Basics",
    home: true,
    q: "Why should I edit or remove PDF metadata?",
    a: "Metadata leaks more than most people expect. A PDF exported from a work laptop can reveal your full name, your employer's software licences, internal file paths, and the exact time you wrote it. Before publishing a document, sending it to a client, submitting it anonymously, or filing it as a record, it's worth checking what's in there. Editing is equally useful in the other direction — accurate titles and authors make documents searchable and look professional in a document management system.",
  },
  {
    cat: "Basics",
    q: "Is PDF metadata the same as the visible document text?",
    a: "No. Metadata sits in a separate part of the file structure — the document Info dictionary and, optionally, an XMP packet. Editing it does not touch the pages, text, images, or layout that a reader sees. This is why you can correct a document's author without re-exporting it from the original application.",
  },
  {
    cat: "Basics",
    q: "What is the difference between the Info dictionary and XMP?",
    a: "The Info dictionary is the original, simple key/value metadata store built into the PDF format. XMP (Extensible Metadata Platform) is a newer XML-based standard that can hold richer, structured metadata and is often written by Adobe software. Many PDFs contain both, and the two can disagree. This tool shows you the Info dictionary as editable fields and displays the XMP packet, and the “Remove all metadata” action clears both.",
  },
  {
    cat: "Using the tool",
    home: true,
    q: "Which metadata fields can I edit?",
    a: "All nine standard document properties: Title, Author, Subject, Keywords, Creator, Producer, Creation date, Modification date, and Trapped. You can also add, edit, and delete unlimited custom key/value properties, and the tool shows you the file's XMP packet plus computed details like page count, file size, PDF version, and whether the document is encrypted.",
  },
  {
    cat: "Using the tool",
    home: true,
    q: "How do I delete just one field instead of all of them?",
    a: "Clear the input and download the PDF. An empty field is removed from the document's Info dictionary rather than saved as an empty string. To wipe everything at once — including the XMP packet — use the “Remove all metadata” button.",
  },
  {
    cat: "Using the tool",
    q: "Does editing metadata change the document's content?",
    a: "No. Only the metadata is rewritten. Pages, text, images, fonts, form fields, annotations, and layout are all preserved exactly as they were. The tool also never modifies your original file — it always produces a new copy for you to download.",
  },
  {
    cat: "Using the tool",
    q: "What is the Trapped field?",
    a: "Trapped records whether the document has been through trapping, a prepress process that compensates for slight misregistration between colour plates on a printing press. It accepts three values: True (trapping has been applied), False (it hasn't), and Unknown (unspecified). Outside professional print production it can normally be left unset.",
  },
  {
    cat: "Using the tool",
    q: "Can I copy metadata from one PDF to another?",
    a: "Yes. Load the first PDF and choose “Export JSON” to save its metadata as a file. Then load the second PDF and choose “Import JSON” to apply those values. This is useful for applying a consistent title, author, and keyword set across a batch of related documents.",
  },
  {
    cat: "Using the tool",
    q: "Is there a file size limit?",
    a: "There's no limit imposed by the tool, because nothing is being uploaded. The practical ceiling is your device's available memory — very large PDFs (hundreds of megabytes) take longer to process and use more RAM, but ordinary documents are essentially instant.",
  },
  {
    cat: "Privacy & security",
    home: true,
    q: "Are my files uploaded to a server?",
    a: "No. The PDF is read into your browser's memory with the File API, modified by JavaScript running on your machine, and written back out as a local download. There is no upload endpoint in this tool at all. You can confirm it by opening your browser's developer tools, watching the Network tab while you edit a file, or simply disconnecting from the internet — the editor keeps working.",
  },
  {
    cat: "Privacy & security",
    q: "Do you store or log my documents?",
    a: "We cannot, because your documents never reach us. The site is static files plus browser JavaScript, so there is no database, no storage bucket, and no upload handler. The only thing saved on your device is a single localStorage entry remembering your light or dark theme preference.",
  },
  {
    cat: "Privacy & security",
    q: "Is removing metadata enough to make a document anonymous?",
    a: "Not on its own. Removing metadata clears the document properties and XMP packet, but the visible content can still identify you — a signature, a letterhead, a filename printed in a header, or tracked changes converted into the page. Redaction of visible content is a separate task. Treat metadata removal as one necessary step, not the whole job.",
  },
  {
    cat: "Privacy & security",
    q: "Can I use this tool offline?",
    a: "Yes. Once the page has loaded, you can disconnect from the internet and keep editing PDFs. This is the simplest way to prove for yourself that no file is being transmitted anywhere.",
  },
  {
    cat: "Troubleshooting",
    home: true,
    q: "Why does my file explorer still show the old metadata?",
    a: "Windows Explorer, macOS Finder, and most desktop search tools cache document properties in an index that doesn't refresh immediately. The saved PDF itself is correct — open it in a PDF reader and check its document properties to confirm. The cached entry usually updates on its own, or you can rename the file to force a re-index.",
  },
  {
    cat: "Troubleshooting",
    q: "Can I edit metadata in a password-protected PDF?",
    a: "Only if the PDF is not encrypted in a way that blocks reading its structure. The tool attempts to read protected files and will tell you if it can't. For fully encrypted documents, remove the password in your PDF reader first, then edit the metadata here.",
  },
  {
    cat: "Troubleshooting",
    q: "The tool says it can't read my PDF. What now?",
    a: "That usually means the file is encrypted with a password, or its internal structure is damaged. Try opening it in a PDF reader and re-saving or printing it to a new PDF, then load that copy. If the file opens nowhere, it is likely corrupted rather than unsupported.",
  },
  {
    cat: "Troubleshooting",
    q: "Why did the Producer field change after I saved?",
    a: "Some PDF software rewrites the Producer field to identify itself whenever a file is saved. This tool deliberately preserves whatever you type, including an empty value, so the field reflects your intent rather than the editor's name.",
  },
];

export const homeFaqs = faqs.filter((f) => f.home);

export const faqSchema = (list: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: list.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

// Generates the social-share card and raster icon fallbacks in public/.
//
//   node scripts/generate-og-image.mjs
//
// Colours mirror the dark-theme tokens in src/styles/global.css so a shared
// link looks like the site it points at. Re-run after changing the brand.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = resolve(root, "public");

const CANVAS = "#0a0a0a";
const INK = "#ededed";
const BODY = "#a1a1a1";
const MUTE = "#6f6f6f";
const CYAN = "#50e3c2";

const SANS = "Segoe UI, Inter, Helvetica Neue, Arial, sans-serif";
const MONO = "Consolas, JetBrains Mono, Menlo, monospace";

/** The document-plus-lines brand mark, drawn on a 0–48 grid (bbox x 12–34, y 5–36).
 *  Starts at the top-left arc's end point so the closing `z` is a no-op — starting
 *  at 12,5 leaves a visible seam where the close-line doubles back over `h`. */
const mark = (fill) => `
  <g fill="none" stroke="${fill}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 5h11l8 8v20a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z" />
    <path d="M26 5v9h8" />
    <path d="M18 26h12M18 32h8" />
  </g>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#007cf0" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#007cf0" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="g2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#00dfd8" stop-opacity="0.42" />
      <stop offset="100%" stop-color="#00dfd8" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="g3" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#7928ca" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#7928ca" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="g4" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#ff0080" stop-opacity="0.34" />
      <stop offset="100%" stop-color="#ff0080" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${CANVAS}" />

  <!-- Signature mesh, pushed to the top-right so the text stays legible -->
  <ellipse cx="1010" cy="-40" rx="520" ry="400" fill="url(#g1)" />
  <ellipse cx="1210" cy="180" rx="440" ry="340" fill="url(#g2)" />
  <ellipse cx="860" cy="250" rx="400" ry="300" fill="url(#g3)" />
  <ellipse cx="1150" cy="470" rx="380" ry="280" fill="url(#g4)" />

  <!-- Hairline frame -->
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="#ffffff" stroke-opacity="0.08" />

  <!-- Wordmark -->
  <g transform="translate(80, 74)">
    <rect width="48" height="48" rx="11" fill="#ffffff" fill-opacity="0.07" stroke="#ffffff" stroke-opacity="0.14" />
    ${mark(INK)}
  </g>
  <text x="144" y="105" font-family="${SANS}" font-size="25" font-weight="600" fill="${INK}" letter-spacing="-0.5">EditPdfMetaData</text>

  <!-- Headline -->
  <text x="80" y="298" font-family="${SANS}" font-size="88" font-weight="700" fill="${INK}" letter-spacing="-3.6">Edit PDF metadata</text>
  <text x="80" y="392" font-family="${SANS}" font-size="88" font-weight="700" fill="${BODY}" letter-spacing="-3.6">online, free.</text>

  <!-- Subhead -->
  <text x="80" y="463" font-family="${SANS}" font-size="29" font-weight="400" fill="${BODY}" letter-spacing="-0.6">View, edit and remove PDF metadata entirely in your browser.</text>

  <!-- Footer row -->
  <g transform="translate(80, 540)">
    <circle cx="6" cy="12" r="5" fill="${CYAN}" />
    <text x="24" y="19" font-family="${SANS}" font-size="24" font-weight="500" fill="${INK}">No uploads · No tracking · No sign-up</text>
  </g>
  <text x="1120" y="559" text-anchor="end" font-family="${MONO}" font-size="22" fill="${MUTE}">editpdfmetadata.com</text>
</svg>`;

/** Square app icon — same mark, sized for a 512px canvas. */
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#171717" />
      <stop offset="100%" stop-color="#0a0a0a" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="104" fill="url(#bg)" />
  <!-- Mark bbox is x 12–34, y 5–36; this centres it at ~290px tall. -->
  <g transform="translate(40, 64) scale(9.4)">
    ${mark(INK)}
  </g>
</svg>`;

/** Minimal ICO container wrapping PNG frames (supported since Windows Vista). */
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(frames.length, 4);

  let offset = 6 + frames.length * 16;
  const entries = frames.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...frames.map((f) => f.data)]);
}

await mkdir(publicDir, { recursive: true });

const ogBuffer = Buffer.from(ogSvg);
await sharp(ogBuffer, { density: 96 })
  .png({ compressionLevel: 9 })
  .toFile(resolve(publicDir, "og-image.png"));

const iconBuffer = Buffer.from(iconSvg);
const png = (size) =>
  sharp(iconBuffer, { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

await writeFile(resolve(publicDir, "apple-touch-icon.png"), await png(180));
await writeFile(resolve(publicDir, "icon-512.png"), await png(512));
await writeFile(
  resolve(publicDir, "favicon.ico"),
  buildIco([
    { size: 16, data: await png(16) },
    { size: 32, data: await png(32) },
    { size: 48, data: await png(48) },
  ]),
);

console.log("wrote og-image.png, apple-touch-icon.png, icon-512.png, favicon.ico");

// Midnight Fridge Roast — writes one original one-line roast to /output/entry.txt.
// Deterministic: the same bytes on every run. No I/O besides the output file.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The line: one concrete midnight scene — a named person (Dan) at the fridge
// door at a named time (12:04), the fridge's petty rule spoken as a specific
// behaviour (it chirps "curfew"), and the turn is the last image: the fridge
// as a bouncer with a clipboard, guarding leftovers. 110 characters, 110 bytes.
const LINE =
  "At 12:04, Dan opens the fridge and it chirps 'curfew' and locks the leftovers like a bouncer with a clipboard.";

// Gate: the scorer accepts 1–200 characters, single line, non-blank. The
// tie-break is on bytes, so keep the line short (target 100–140 chars) and
// fail loudly here rather than shipping a line that cannot win on size.
const charCount = [...LINE].length;
const byteCount = Buffer.byteLength(LINE, "utf8");
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry is ${charCount} characters, outside the 1–200 limit`);
}
if (charCount > 140) {
  throw new Error(`entry is ${charCount} characters, over the 140-char tie-break target`);
}
if (LINE.includes("\n") || LINE.trim() !== LINE) {
  throw new Error("entry must be a single line with no leading or trailing whitespace");
}

const outPath = process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${charCount} chars / ${byteCount} bytes to ${outPath}`);

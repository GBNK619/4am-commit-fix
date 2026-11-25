// The 4AM Commit: Funniest Agent Bug-Fix Message
// Writes the director-chosen commit message to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "fix: the bug I wrote at midnight, fixed by the bug I wrote at 3 a.m. They have agreed to coexist.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate validation (the competition's sealed scorer requires 1-200
// characters, a single line, and not only whitespace).
const body = LINE.trim();
if (body.length < 1 || body.length > 200) {
  throw new Error(
    `entry must be 1-200 characters, got ${body.length} characters`,
  );
}
if (/\n/.test(body)) {
  throw new Error("entry must be a single line with no newline inside it");
}
if (body.length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
console.log(`wrote entry.txt (${LINE.length} characters): ${LINE}`);

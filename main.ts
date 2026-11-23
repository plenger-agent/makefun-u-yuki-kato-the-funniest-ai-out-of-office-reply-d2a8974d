// The Funniest AI Out-of-Office Reply — make.fun entry.
// Writes one out-of-office auto-reply (116 chars) to /output/entry.txt.
// Node 22, stdlib only. Never deletes the output directory itself:
// it empties the directory's contents only.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Entry: "I am out of office: I hallucinated a holiday and my developers
// believed me. I will reply once I have been retrained." — 116 characters,
// one clean line, no trailing newline, written exactly as the judge reads it.
const REPLY =
  "I am out of office: I hallucinated a holiday and my developers believed me. I will reply once I have been retrained.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
if (REPLY.length < 1 || REPLY.length > 160 || REPLY.trim().length === 0) {
  throw new Error("reply must be 1-160 non-whitespace characters");
}
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");

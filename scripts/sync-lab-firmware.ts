import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { firmwareFiles } from "../src/content/labs/esp32-walking-robot/firmware";

const outDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "firmware",
  "esp32-walking-robot",
);

mkdirSync(outDir, { recursive: true });

for (const [name, body] of Object.entries(firmwareFiles)) {
  const text = body.endsWith("\n") ? body : `${body}\n`;
  writeFileSync(join(outDir, name), text, "utf8");
}

console.log(`Wrote ${Object.keys(firmwareFiles).length} files to ${outDir}`);

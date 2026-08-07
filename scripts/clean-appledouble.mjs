import { readdir, unlink } from "node:fs/promises";
import { join } from "node:path";

const projectRoot = process.cwd();
const skippedDirectories = new Set([".git", "node_modules"]);
let removed = 0;

async function cleanDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!skippedDirectories.has(entry.name)) await cleanDirectory(entryPath);
      return;
    }

    if (entry.isFile() && entry.name.startsWith("._")) {
      await unlink(entryPath);
      removed += 1;
    }
  }));
}

await cleanDirectory(projectRoot);
console.log(`Removed ${removed} AppleDouble file${removed === 1 ? "" : "s"}.`);

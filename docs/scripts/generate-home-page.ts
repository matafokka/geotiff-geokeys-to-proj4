import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

(async function () {
  let content: string;

  try {
    content = (await readFile(join(import.meta.dirname, "..", "..", "dist", "README.md"))).toString();
  } catch (e) {
    if (typeof e === "object" && (e as any).code === "ENOENT") {
      console.warn("Library has not been built yet. Using root README.md.");
      content = (await readFile(join(import.meta.dirname, "..", "..", "README.md"))).toString();
    } else {
      throw e;
    }
  }

  content =
    "<!-- DO NOT EDIT! This file has been automatically generated. -->\n" +
    content
      .split("\n")
      .filter((line) => !line.startsWith("#") || !line.includes("Documentation")) // Filter out documentation
      .join("\n");

  await writeFile(join(import.meta.dirname, "..", "index.md"), content);
})();

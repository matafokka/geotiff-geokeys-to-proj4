import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Plugin } from "vite";

export function viteCopyReadme(): Plugin {
  let root: string;

  return {
    name: "vite-copy-readme",

    configResolved(config) {
      root = config.root;
    },

    async generateBundle() {
      let content = (await readFile(join(root, "README.md"))).toString();

      // Resolve relative URL
      content = content.replaceAll(
        /(\]\((?!(http:\/\/)|(https:\/\/)))/g,
        "](https://github.com/matafokka/geotiff-geokeys-to-proj4/tree/main/",
      );

      this.emitFile({
        type: "prebuilt-chunk",
        fileName: "README.md",
        code: content,
      });
    },
  };
}

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "unplugin-dts/vite";
import { viteBuildPackageJson } from "./src/vite-plugins/vite-build-package-json.ts";
import { viteCopyReadme } from "./src/vite-plugins/vite-copy-readme.ts";

export default defineConfig({
  plugins: [
    dts({ entryRoot: "./src", exclude: ["node_modules/**", "docs", "tests", "src/cli", "src/vite-plugins"] }),
    viteBuildPackageJson(),
    viteCopyReadme(),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    sourcemap: true,

    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "geokeysToProj4",
      fileName: "index",
      formats: ["es", "cjs"],
    },

    minify: "terser",

    terserOptions: {
      ecma: 2015,
      compress: {
        toplevel: true,
        builtins_pure: true,
      },
    },
  },
});

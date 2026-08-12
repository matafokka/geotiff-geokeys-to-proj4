import type { Plugin } from "vite";
import packageJsonRaw from "../../package.json" with { type: "json" };

const packageJson = packageJsonRaw as any;
delete packageJson.scripts;

const packageJsonStr = JSON.stringify(packageJson, undefined, 2).replaceAll("dist/", "");

export function viteBuildPackageJson(): Plugin {
  return {
    name: "vite-build-package-json",

    generateBundle() {
      this.emitFile({
        type: "prebuilt-chunk",
        fileName: "package.json",
        code: packageJsonStr,
      });
    },
  };
}

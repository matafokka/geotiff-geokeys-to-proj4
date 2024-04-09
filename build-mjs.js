const path = require("path");
const fs = require("fs");
const esbuild = require("esbuild");

(async () => {
  const { customAlphabet  } = await import("nanoid");

  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const nanoid = customAlphabet(alphabet + alphabet.toUpperCase());

  await esbuild.build({
    entryPoints: ["./main.js"],
    bundle: true,
    outfile: "main-dist.mjs",
    format: "esm",
    target: "es6",
    minify: true,
  });

  // Add named exports

  const filePath = path.join(__dirname, "main-dist.mjs");
  const content = fs.readFileSync(filePath).toString();

  // Get __commonJs() transformed name
  const exportStr = "export default ";
  const exportStart = content.indexOf(exportStr);
  const nameStart = exportStart + exportStr.length;
  const nameEnd = content.indexOf("(", nameStart);
  const exportName = content.substring(nameStart, nameEnd);
  let afterExportCall = content.substring(content.indexOf(")", nameEnd) + 1);

  if (afterExportCall.startsWith(";")) {
    afterExportCall = afterExportCall.substring(1);
  }

  // Find function definition
  const exportDef = `var ${exportName}=`;
  const exportDefStart = content.lastIndexOf(exportDef) + exportDef.length;

  // Get actual export
  const moduleDef = ".exports={";
  const moduleStart = content.indexOf(moduleDef, exportDefStart) + moduleDef.length;

  // Copy module content from start to end index by counting brackets.
  // When brackets count is 0, outer scope has been closed.
  let scopeDepth = 1;

  let moduleContent = "";
  for (let i = moduleStart; i < content.length; i++) {
    const char = content[i];

    if (char === "{") scopeDepth++;
    else if (char === "}") scopeDepth--;

    moduleContent += char;

    // 0 depth means that we've exited object
    if (scopeDepth === 0) break;
  }

  const object = eval(`(() => {return {${moduleContent}})();`);
  const varName = nanoid();
  let namedExports = "";

  for (const key in object) {
    namedExports += `export var ${key}=${varName}.${key};`;
  }

  const newContent = `${content.substring(0, exportStart)}var ${varName}=${exportName}();export default ${varName};${namedExports}${afterExportCall}`;
  fs.writeFileSync(filePath, newContent);
})();

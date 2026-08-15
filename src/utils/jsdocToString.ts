/**
 * Converts JSDoc lines into an output JSDoc string
 *
 * @param jsdoc JSDoc lines
 * @param indent Indentation levels
 * @returns JSDoc string
 */
export function jsdocToString(jsdoc: string[], indent = 0) {
  if (!jsdoc.length) {
    return "";
  }

  const spacesCount = indent * 2;
  let spaces = "";

  for (let i = 0; i < spacesCount; i++) {
    spaces += " ";
  }

  return `${spaces}/**\n` + jsdoc.map((line) => `${spaces} * ${line}`).join("\n") + `\n${spaces} */`;
}

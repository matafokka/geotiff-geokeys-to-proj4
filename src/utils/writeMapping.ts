import { jsdocToString } from "@/utils/jsdocToString";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

export interface WriteMappingOptions {
  /** Output file name and exported `const` name */
  name: string;

  /** Object to write */
  object: Record<string, any>;

  /** Mapped type as string */
  type?: string;

  /** A list of lines that will be written as a JSDoc */
  jsdoc?: string[];

  /** Code before exported `const` */
  before?: string[];
}

export async function writeMapping(options: WriteMappingOptions) {
  const lines = ["// DO NOT EDIT! This file has been generated automatically.", "", "/* eslint-disable */", ""];

  if (options.before?.length) {
    lines.push(options.before.join("\n"), "");
  }

  if (options.jsdoc?.length) {
    lines.push(jsdocToString(options.jsdoc));
  }

  let exp = `export const ${options.name}`;

  if (options.type) {
    exp += `: ${options.type}`;
  }

  exp += " = " + JSON.stringify(options.object, undefined, 2);

  lines.push(exp);

  await writeFile(join(import.meta.dirname, "..", "mappings", "generated", options.name + ".ts"), lines.join("\n"));
}

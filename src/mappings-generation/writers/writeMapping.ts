import { jsdocToString } from "@/shared/utils/jsdocToString";
import { perfStart } from "@/shared/utils/perf";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

export type MappingContentType = "compressed" | "uncompressed";

export interface WriteMappingOptions {
  /** Output file name and exported `const` name */
  name: string;

  /** Mapping content type */
  contentType: MappingContentType;

  /** Object to write */
  toWrite: object | string;

  /** Mapped type as string */
  type?: string;

  /** A list of lines that will be written as a JSDoc */
  jsdoc?: string[];

  /** Code before exported `const` */
  before?: string[];
}

export async function writeMapping(options: WriteMappingOptions) {
  let name = options.name;

  if (options.contentType === "uncompressed") {
    name = `Uncompressed` + name[0].toUpperCase() + name.substring(1);
  }

  const perfEnd = perfStart(`Write mapping "${name}"`);

  const lines = ["// DO NOT EDIT! This file has been generated automatically.", "", "/* eslint-disable */", ""];

  if (options.before?.length) {
    lines.push(options.before.join("\n"), "");
  }

  if (options.jsdoc?.length) {
    lines.push(jsdocToString(options.jsdoc));
  }

  let exp = `export const ${name}`;

  if (options.type) {
    exp += `: ${options.type}`;
  }

  exp += " = ";

  if (typeof options.toWrite === "string") {
    exp += options.toWrite;
  } else {
    exp += JSON.stringify(options.toWrite, undefined, 2);
  }

  lines.push(exp);

  await writeFile(
    join(import.meta.dirname, "..", "..", "lib", "mappings", options.contentType, name + ".ts"),
    lines.join("\n"),
  );

  perfEnd();
}

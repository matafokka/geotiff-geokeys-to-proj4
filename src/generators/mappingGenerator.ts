import { query } from "@/db";
import type { MaybeGetter, WithEpsgId } from "@/types/misc";
import { toValue } from "@/utils/misc";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

export interface MappingGeneratorOptions<Row, Mapped> {
  /** Database query */
  query: string;

  /** Output file name and exported `const` name */
  name: string;

  /** Mapped type as string */
  type: string;

  /** A list of lines that will be written as a JSDoc */
  jsdoc?: string[];

  /** Code before exported `const` */
  before?: string[];

  /** Called for each row returned by the query */
  onEach: OnEachCb<Row, Mapped>;

  /** Called before executing the query */
  onStart?: OnStartCb<Mapped>;

  /** Called after all rows have been processed */
  onEnd?: OnEndCb<Mapped>;
}

export type OnStartCb<Mapped> = (acc: Record<string, Mapped | undefined>) => void;
export type OnEachCb<Row, Mapped> = (row: Row, acc: Record<string, Mapped | undefined>) => Mapped | void;
export type OnEndCb<Mapped> = (acc: Record<string, Mapped | undefined>) => void;

/**
 * Defines a mapping generator function
 * @param options Options
 * @returns Generator function
 */
export function mappingGenerator<Row extends WithEpsgId, Mapped>(
  options: MaybeGetter<MappingGeneratorOptions<Row, Mapped>>,
) {
  return async () => {
    const opts = toValue(options);

    // Execute query and accumulate results

    const rows = await query<Row>(opts.query);
    const acc: Record<string, Mapped | undefined> = {};

    for (const row of rows) {
      const res = opts.onEach(row, acc);

      if (res === undefined) {
        continue;
      }

      if (row.id === undefined) {
        throw new Error("ID is not defined. Create an alias for a column that should be used as an ID.");
      }

      acc[row.id] = res;
    }

    await opts.onEnd?.(acc);

    // Compose and write output file

    const lines = ["// DO NOT EDIT! This file has been generated automatically.", "", "/* eslint-disable */", ""];

    if (opts.before?.length) {
      lines.push(opts.before.join("\n"), "");
    }

    if (opts.jsdoc?.length) {
      lines.push("/**", opts.jsdoc.map((line) => " * " + line).join("\n"), "*/");
    }

    lines.push(
      `export const ${opts.name}: Record<string, ${opts.type} | undefined> = ` + JSON.stringify(acc, undefined, 2),
    );

    await writeFile(join(import.meta.dirname, "..", "mappings", opts.name + ".ts"), lines.join("\n"));
  };
}

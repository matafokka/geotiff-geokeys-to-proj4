import { query } from "@/mappings-generation/db";
import {
  writeMapping,
  type MappingContentType,
  type WriteMappingOptions,
} from "@/mappings-generation/writers/writeMapping";
import type { MaybeGetter } from "@/shared/types/misc";
import type { WithEpsgId } from "@/mappings-generation/types/misc";
import { once, toValue } from "@/shared/utils/misc";
import { encodePlainTextMapWithDecoder } from "@/shared/formats/plain-text-map";
import { perfStart } from "@/shared/utils/perf";

export interface MappingGeneratorOptions<Row, Mapped> extends Omit<WriteMappingOptions, "toWrite" | "contentType"> {
  /** Database query */
  query: string;

  type: string;

  /** Other generators that this one depends on */
  dependencies?: Generator<any>[];

  /**
   * Whether generation results should be written to disk
   *
   * @default true
   */
  writable?: boolean;

  /** Called for each row returned by the query */
  onEach: OnEachCb<Row, Mapped>;

  /** Called before executing the query */
  onStart?: OnStartCb<Mapped>;

  /** Called after all rows have been processed */
  onEnd?: OnEndCb<Mapped>;
}

export type OnStartCb<Mapped> = (state: Record<string, Mapped | undefined>) => void;
export type OnEachCb<Row, Mapped> = (row: Row, state: Record<string, Mapped | undefined>) => Mapped | void;
export type OnEndCb<Mapped> = (state: Record<string, Mapped | undefined>) => void;

export interface Generator<Mapped> {
  /** Generated state */
  state: Record<string, Mapped | undefined>;

  /** Whether generation results should be written to disk */
  writable: boolean;

  /** Generates state. Runs only once. */
  generate: () => Promise<void>;

  /** Writes state to file */
  write: (value?: any) => Promise<void>;

  /** Backs up current state */
  backup: () => void;
}

/**
 * Defines a mapping generator function
 * @param options Options
 * @returns Generator function
 */
export function mappingGenerator<Row extends WithEpsgId, Mapped>(
  options: MaybeGetter<MappingGeneratorOptions<Row, Mapped>>,
): Generator<Mapped> {
  const opts = toValue(options);
  const writable = opts.writable ?? true;
  const state: Record<string, Mapped | undefined> = {};
  let stateBak: Record<string, Mapped | undefined> = {};

  const generate = once(async () => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (opts.dependencies?.length) {
      await Promise.all(opts.dependencies?.map((dep) => dep.generate()));
    }

    const perfEnd = perfStart(`Generate "${opts.name}" from database`);

    const [rows] = await Promise.all([query<Row>(opts.query), opts.onStart?.(state)]);

    for (const row of rows) {
      const res = opts.onEach(row, state);

      if (res === undefined) {
        continue;
      }

      if (row.id === undefined) {
        throw new Error("ID is not defined. Create an alias for a column that should be used as an ID.");
      }

      state[row.id] = res;
    }

    await opts.onEnd?.(state);

    perfEnd();
  });

  const backup = () => void (stateBak = JSON.parse(JSON.stringify(state)));

  const writeOne = async (value: Record<string, Mapped | undefined>, contentType: MappingContentType) => {
    if (!writable) {
      return;
    }

    let before = opts.before;
    let toWrite: string | object;

    if (opts.type === "string") {
      before = (before || [])?.concat(['import { decodePlainTextMap } from "@/shared/formats/plain-text-map"']);
      toWrite = encodePlainTextMapWithDecoder(value as Record<string, string | undefined>);
    } else {
      toWrite = value;
    }

    await writeMapping({
      ...opts,
      contentType,
      before,
      toWrite,
      type: `Record<string, ${opts.type} | undefined>`,
    });
  };

  const write = async () => {
    await Promise.all([writeOne(state, "compressed"), writeOne(stateBak, "uncompressed")]);
  };

  return { state, writable, generate, write, backup };
}

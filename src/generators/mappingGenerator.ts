import { query } from "@/db";
import { writeMapping, type WriteMappingOptions } from "@/utils/writeMapping";
import type { MaybeGetter, WithEpsgId } from "@/types/misc";
import { once, toValue } from "@/utils/misc";

export interface MappingGeneratorOptions<Row, Mapped> extends Omit<WriteMappingOptions, "object"> {
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

  const generate = once(async () => {
    if (opts.dependencies?.length) {
      await Promise.all(opts.dependencies?.map((dep) => dep.generate()));
    }

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
  });

  const write = async (value = state) => {
    if (writable) {
      await writeMapping({ ...opts, object: value, type: `Record<string, ${opts.type} | undefined>` });
    }
  };

  return { state, writable, generate, write };
}

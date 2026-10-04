/** An object with the `id` key */
export interface WithId<T = string> {
  id: T;
}

/** A value or a function that returns a value */
export type MaybeGetter<T> = T | (() => T);

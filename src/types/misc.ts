export interface WithId<T = string> {
  id: T;
}

export interface WithEpsgId extends WithId<string | number> {}

export type MaybeGetter<T> = T | (() => T);

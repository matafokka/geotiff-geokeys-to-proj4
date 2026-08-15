import type { MaybeGetter } from "@/types/misc";

export function parseFloatLoose(value: any, fallback = 0) {
  const f = parseFloat(value);
  return isNaN(f) ? fallback : f;
}

export function toValue<T>(value: MaybeGetter<T>): T {
  return typeof value === "function" ? (value as any)() : value;
}

/**
 * Runs given function only once. Subsequent runs return previously returned value.
 * @param fn Function that must be run only once
 * @returns Function that runs only once.
 */
export function once<T extends (...args: any[]) => any>(fn: T) {
  let res: ReturnType<typeof fn> | undefined;
  return ((...args: any[]) => (res ??= fn(...args)) satisfies T) as T;
}

/** Clones value by calling `JSON.parse(JSON.stringify(value))` */
export function cloneWithJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

import type { MaybeGetter } from "@/types/misc";

export function parseFloatLoose(value: any, fallback = 0) {
  const f = parseFloat(value);
  return isNaN(f) ? fallback : f;
}

export function toValue<T>(value: MaybeGetter<T>): T {
  return typeof value === "function" ? (value as any)() : value;
}

import { formatNumber } from "@/shared/utils/formatNumber";
import { isThenable } from "@/shared/utils/misc";
import { blue, bold, gray, green, type Color } from "colorette";

function logPerf(icon: string, color: Color, name: string, text: string) {
  console.log(`${bold(color(icon))} ${name} ${gray("➔")} ${color(text)}`);
}

/**
 * Starts measuring performance
 * @param name Task name
 * @returns Function that ends measuring performance
 */
export function perfStart(name: string) {
  logPerf("▷", blue, name, "started");
  const start = performance.now();

  return () => {
    const time = performance.now() - start;
    logPerf("✓", green, name, `took ${bold(formatNumber(time))} ms`);
  };
}

/**
 * Measures and prints time a function took to complete
 * @param name Task name
 * @param fn Task function
 * @returns Function return value
 */
export function measure<T extends (...args: any[]) => any>(name: string, fn: T): ReturnType<T> {
  const perfEnd = perfStart(name);
  const res = fn();

  if (isThenable(res)) {
    res.then(perfEnd);
  } else {
    perfEnd();
  }

  return res;
}

/**
 * Adds performance measurements (see {@link measure}) to a function
 * @param name Task name
 * @param fn Task function
 * @returns The same function but with the performance metrics
 */
export function measured<T extends (...args: any[]) => any>(name: string, fn: T) {
  return ((...args: Parameters<T>) => measure(name, () => fn(...args))) as T;
}

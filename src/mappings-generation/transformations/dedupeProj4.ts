import { forEachProjString } from "@/mappings-generation/transformations/forEachProjString";
import { measured } from "@/shared/utils/perf";
import { keyValuesToProj4, proj4ToKeyValues } from "@/shared/utils/proj4";

/** Removes duplicate proj4 parameters that may appear during generation. Modifies global state. */
export const dedupeProj4 = measured("Dedupe proj4 dataset", () => forEachProjString(dedupeOne));

function dedupeOne(str: string) {
  const processed = new Set();
  const kvs = proj4ToKeyValues(str);
  const newKvs: typeof kvs = [];

  for (const kv of kvs) {
    const key = kv[0];

    if (processed.has(key)) {
      continue;
    }

    processed.add(key);
    newKvs.push(kv);
  }

  return keyValuesToProj4(newKvs);
}

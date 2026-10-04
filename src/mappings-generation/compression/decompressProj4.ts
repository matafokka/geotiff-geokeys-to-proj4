import { proj4dict } from "@/lib/mappings/compressed/proj4dict";
import { keyValuesToProj4, proj4ToKeyValues } from "@/shared/utils/proj4";

export function decompressProj4(str: string) {
  str = decompressInternal(str);
  const kvs = proj4ToKeyValues(str);

  for (const kv of kvs) {
    const token = kv[0];
    kv[0] = token[0] === "+" ? token.substring(1) : "+" + token;
  }

  return keyValuesToProj4(kvs);
}

function decompressInternal(str: string) {
  const kvs = proj4ToKeyValues(str);

  for (const kv of kvs) {
    for (let i = 0; i < kv.length; i++) {
      const token = kv[i];
      const fromDict = proj4dict[token];
      kv[i] = fromDict ? decompressInternal(fromDict) : token;
    }
  }

  return keyValuesToProj4(kvs);
}

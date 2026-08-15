import { proj4dict } from "@/mappings/generated/proj4dict";
import { keyValuesToProj4, proj4ToKeyValues } from "@/utils/proj4";

export function decompressProj4(str: string) {
  return keyValuesToProj4(proj4ToKeyValues(str).map((kv) => kv.map((v) => proj4dict[v] || v)));
}

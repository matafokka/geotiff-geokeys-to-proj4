import type { CoordinateUnits } from "@/types/CoordinateUnits";

/**
 * Maps base units to their types description. For example, "9001" is mapped to "metre".
 */
export const KnownBaseUnits: Record<string, CoordinateUnits | undefined> = {
  "1026": "metre per second",
  "1035": "radian per second",
  "1036": "scale per second",
  "1040": "second",
  "9001": "metre",
  "9101": "radian",
  "9201": "scale",
};

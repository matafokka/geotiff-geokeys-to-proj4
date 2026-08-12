import type { CoordinateUnits } from "@/types/CoordinateUnits";

export interface UnitsObj {
  /** Multiplier that converts these units to the base units */
  m: number;

  /** Base units type */
  t: CoordinateUnits;
}

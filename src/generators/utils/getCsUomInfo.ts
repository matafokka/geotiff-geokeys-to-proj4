import { unitsGenerator } from "@/generators/unitsGenerator";
import { radToDeg } from "@/utils/math";

/**
 * Tries to return various information on the CS units extracted from the CS name.
 */
export function getCsUomInfo(uom: string) {
  const multipliers: Record<string, number> = {
    "ft": 0.3048,
    "ftus": 0.3048006096,
    "ydind": 0.3047995,
    "ftcla": 0.3047972654,
    "ydcl": 3.3047972654,
    "chbnb": unitsGenerator.state["9042"]!.m,
    "chse": 20.1167651215526,
    "chse(t)": 20.116756,
    "ftgc": 0.304799710181509,
    "ftse": 0.304799471538676,
    "km": 1000,
    "lkcla": 0.201166195164,
    "ydse": 0.914398414616029,
    "glm": 1.0000135965,
    "lk": 0.201168,
  };

  let m = 0;
  let isAngle = false;

  if (uom === "deg" || uom === "degree" || uom === "degrees") {
    // Can't just find deg because there're degree with hemisphere and dec degree
    m = 1;
    isAngle = true;
  } else if (uom.includes("grad") || uom.includes("gon")) {
    m = radToDeg(unitsGenerator.state["9105"]!.m);
    isAngle = true;
  } else if (uom.includes("rad")) {
    // grad handled by previous case
    m = radToDeg(unitsGenerator.state["9101"]!.m);
    isAngle = true;
  } else if (uom === "m" || uom.includes("met")) {
    m = 1;
  } else if (uom.includes("br36")) {
    m = 0.3048007491; // British feet (1936)
  } else if (uom in multipliers) {
    m = multipliers[uom];
  }

  // Uoms don't use other units than specified above for now, but let's kinda future-proof it
  if (uom.includes("μ") || (isAngle && uom.includes("m"))) {
    m *= 0.000001;
  }

  return {
    /**
     * Multiplier that converts source units into the base units.
     *
     * Will be 0 if no data can be extracted.
     */
    m,

    /**
     * Whether the units are angles
     */
    isAngle,
  };
}

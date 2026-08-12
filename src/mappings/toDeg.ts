import { Units } from "@/mappings/Units";
import { radToDeg } from "@/utils/math";
import { parseFloatLoose } from "@/utils/misc";

/**
 * Returns sign from given hemisphere
 * @param hemisphere Hemisphere letter (n, s, e, w), case insensitive
 * @return Sign from given hemisphere
 */
function signFromHemisphere(hemisphere: string) {
  const h = hemisphere.toLowerCase();
  return h === "n" || h === "e" ? 1 : -1;
}

/**
 * Converts value with given units EPSG code to degrees
 *
 * @param value Value to convert
 * @param code Units EPSG code
 * @return Given value in degrees or `undefined` when units can't be converted
 */
export function toDeg(value: number | string, code: number): number | undefined {
  const valueStr = value + "";
  const valueNum = parseFloatLoose(valueStr);

  if (Units[code]) {
    return radToDeg(valueNum * Units[code].m);
  }

  // Messed up stuff. Remark from the database:
  // Pseudo unit. Format: signed degrees - period - minutes (2 digits) - integer seconds (2 digits) - fraction
  // of seconds (any precision). Must include leading zero in minutes and seconds and exclude decimal point for seconds.
  // Convert to deg using algorithm.

  if (code === 9110) {
    let normVal = valueStr;
    let ptPos = normVal.indexOf(".");

    // Add point and zeroes to normalize

    if (ptPos === -1) {
      ptPos = normVal.length;
      normVal += ".0000";
    }

    // Add missing zeroes to normalize

    const lengthAfterPoint = normVal.length - 1 - ptPos;

    if (lengthAfterPoint < 4) {
      for (let i = 0; i < 4 - lengthAfterPoint; i++) {
        normVal += "0";
      }
    }

    // Parse parts

    const sign = Math.sign(valueNum);
    const deg = Math.abs(parseFloat(normVal.substring(0, ptPos)));
    const min = parseFloat(normVal.substring(ptPos + 1, ptPos + 3));

    let secStr = normVal.substring(ptPos + 3);
    secStr = secStr ? secStr.substring(0, 2) + "." + secStr.substring(2) : "";

    const sec = parseFloatLoose(secStr);

    return sign * (deg + min / 60 + sec / 3600);
  }

  // Hemisphere degree
  if (code === 9117) {
    const sign = signFromHemisphere(valueStr[0]);
    const degs = parseFloat(valueStr.substring(1));
    return sign * degs;
  }

  // Degree hemisphere
  if (code === 9116) {
    const sign = signFromHemisphere(valueStr[valueStr.length - 1]);
    const degs = parseFloatLoose(valueStr.substring(0, valueStr.length - 1));
    return sign * degs;
  }
}

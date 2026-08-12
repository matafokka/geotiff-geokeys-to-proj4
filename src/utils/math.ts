const TO_RAD = Math.PI / 180;
const TO_DEG = 180 / Math.PI;

export function degToRad(value: number) {
  return value * TO_RAD;
}

export function radToDeg(value: number) {
  return value * TO_DEG;
}

export function toFixed(n: number, fractionDigits = 12) {
  return Number(n.toFixed(fractionDigits));
}

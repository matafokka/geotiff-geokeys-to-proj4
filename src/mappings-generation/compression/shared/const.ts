import { PLAIN_TEXT_MAP_SEPS } from "@/shared/formats/plain-text-map";

export const EQUALS_SIZE = Buffer.byteLength("=");
export const SPACE_SIZE = Buffer.byteLength(" ");
export const DICT_ENTRY_SIZE = PLAIN_TEXT_MAP_SEPS.reduce((sum, sep) => sum + Buffer.byteLength(sep), 0);

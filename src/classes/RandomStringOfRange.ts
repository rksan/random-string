import * as types from "@/types";
import { convertRangeOfCode } from "@/utils";

const DEFAULT_CHAR_START = "!";
const DEFAULT_CHAR_START_CODE = DEFAULT_CHAR_START.charCodeAt(0);
const DEFAULT_CHAR_START_HEX = DEFAULT_CHAR_START_CODE.toString(16);
const DEFAULT_CHAR_END = "~";
const DEFAULT_CHAR_END_CODE = DEFAULT_CHAR_END.charCodeAt(0);
const DEFAULT_CHAR_END_HEX = DEFAULT_CHAR_END_CODE.toString(16);

export class RandomStringOfRange implements types.RandomStringOfAny {
  #ranges: types.RandomStringRangeOfCode[];

  constructor(range?: types.RandomStringRange | types.RandomStringRange[]) {
    this.#ranges = range
      ? convertRangeOfCode(range)
      : [
          {
            start: {
              code: DEFAULT_CHAR_START_CODE,
              hex: DEFAULT_CHAR_START_HEX,
              char: DEFAULT_CHAR_START,
            },
            end: {
              code: DEFAULT_CHAR_END_CODE,
              hex: DEFAULT_CHAR_END_HEX,
              char: DEFAULT_CHAR_END,
            },
          },
        ];
  }

  toCode() {
    const range = this.#getRange();
    const base = this.#getBase(range);

    const seed = Math.floor(Math.random() * base);
    const code = seed + range.start.code;

    return code;
  }

  #getRange() {
    const idx = Math.floor(Math.random() * this.#ranges.length);
    return this.#ranges[idx];
  }

  #getBase(range: types.RandomStringRangeOfCode) {
    return range.end.code - range.start.code;
  }

  toJSON(): object {
    return JSON.parse(this.toString());
  }

  toString() {
    return JSON.stringify(
      {
        ranges: this.#ranges,
      },
      null,
      2
    );
  }
}

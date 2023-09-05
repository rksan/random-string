import * as types from "@/types";
import { convertRangeOfCode } from "@/utils";

export class RandomStringOfExclude {
  #excludes: types.RandomStringRangeOfCode[];

  constructor(
    excludes?: string | types.RandomStringRange | types.RandomStringRange[]
  ) {
    this.#excludes = excludes ? convertRangeOfCode(excludes) : [];
  }

  include(code: number) {
    if (this.#excludes.length === 0) {
      return false;
    } else {
      for (let i = 0; i < this.#excludes.length; i++) {
        const range = this.#excludes[i];
        if (range.start.code <= code && code <= range.end.code) {
          return true;
        }
      }
    }
  }

  toJSON(): object {
    return JSON.parse(
      JSON.stringify({
        excludes: this.#excludes,
      })
    );
  }

  toString() {
    return JSON.stringify(
      {
        excludes: this.#excludes,
      },
      null,
      2
    );
  }
}

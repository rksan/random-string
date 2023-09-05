import * as types from "@/types";
import * as classes from "@/classes";

export class RandomString {
  #length: number;
  #range: types.RandomStringOfAny;
  #exclude: classes.RandomStringOfExclude;

  #codes: number[] = [];

  constructor(
    length: number,
    src?: string | types.RandomStringRange | types.RandomStringRange[],
    exclude?: string | types.RandomStringRange | types.RandomStringRange[]
  ) {
    this.#length = length;

    if (typeof src === "string") {
      this.#range = new classes.RandomStringOfTemplate(src);
    } else if (typeof src === "object" || Array.isArray(src)) {
      this.#range = new classes.RandomStringOfRange(src);
    } else {
      this.#range = new classes.RandomStringOfRange();
    }

    if (
      typeof exclude === "string" ||
      typeof exclude === "object" ||
      Array.isArray(exclude)
    ) {
      this.#exclude = new classes.RandomStringOfExclude(exclude);
    } else {
      this.#exclude = new classes.RandomStringOfExclude();
    }

    this.#codes = this.#generate();
  }

  #generate(): number[] {
    const codes: number[] = new Array(this.#length);

    for (let i = 0; i < this.#length; ) {
      const code = this.#range.toCode();

      if (this.#exclude.include(code)) {
        // none.
      } else {
        codes[i] = code;
        i++;
      }
    }

    return codes;
  }

  toJSON(): object {
    return JSON.parse(
      JSON.stringify(
        {
          length: this.#length,
          range: this.#range.toJSON(),
          exclude: this.#exclude.toJSON(),
          codes: this.#codes,
        },
        null,
        2
      )
    );
  }

  toString(): string {
    return String.fromCharCode(...this.#codes);
  }
}

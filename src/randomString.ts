type RandomStringRange = {
  start: string | number;
  end: string | number;
};

type RandomStringRangeOfCode = {
  start: number;
  end: number;
};

interface RandomStringOfAny {
  toCode(): number;
  toJSON(): object;
}

class RandomStringOfTemplate implements RandomStringOfAny {
  #template: string;

  constructor(template: string) {
    this.#template = template;
  }

  toCode() {
    const base = this.#template.length;
    const seed = Math.floor(Math.random() * base);
    const char = this.#template.charCodeAt(seed);

    return char;
  }

  toJSON(): object {
    return JSON.parse(this.toString());
  }

  toString(): string {
    return JSON.stringify({ template: this.#template }, null, 2);
  }
}

const DEFAULT_START_CHAR = "!";
const DEFAULT_END_CHAR = "~";

class RandomStringOfRange implements RandomStringOfAny {
  #ranges: RandomStringRangeOfCode[];

  constructor(range?: RandomStringRange | RandomStringRange[]) {
    this.#ranges = range
      ? convertRangeOfCode(range)
      : [
          {
            start: DEFAULT_START_CHAR.charCodeAt(0),
            end: DEFAULT_END_CHAR.charCodeAt(0),
          },
        ];
  }

  toCode() {
    const range = this.#getRange();
    const base = this.#getBase(range);

    const seed = Math.floor(Math.random() * base);
    const code = seed + range.start;

    return code;
  }

  #getRange() {
    const idx = Math.floor(Math.random() * this.#ranges.length);
    return this.#ranges[idx];
  }

  #getBase(range: RandomStringRangeOfCode) {
    return range.end - range.start;
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

class RandomStringOfExclude {
  #excludes: RandomStringRangeOfCode[];

  constructor(excludes?: string | RandomStringRange | RandomStringRange[]) {
    this.#excludes = excludes ? convertRangeOfCode(excludes) : [];
  }

  include(code: number) {
    if (this.#excludes.length === 0) {
      return false;
    } else {
      for (let i = 0; i < this.#excludes.length; i++) {
        const range = this.#excludes[i];
        if (range.start <= code && code <= range.end) {
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

const convertRangeOfCode = (
  range: string | RandomStringRange | RandomStringRange[]
): RandomStringRangeOfCode[] => {
  if (typeof range === "string") {
    const rangeOfCodes: RandomStringRangeOfCode[] = new Array(range.length);

    for (let i = 0; i < range.length; i++) {
      const code = range[i].charCodeAt(0);
      rangeOfCodes[i] = { start: code, end: code };
    }

    return rangeOfCodes;
  } else if (Array.isArray(range)) {
    const rangeOfCodes: RandomStringRangeOfCode[] = [];

    range.forEach((r) => {
      const ranges = convertRangeOfCode(r);
      const range = ranges.pop();
      if (range) {
        rangeOfCodes.push(range);
      }
    });

    return rangeOfCodes;
  } else {
    const rangeOfCode: RandomStringRangeOfCode = {
      start:
        typeof range.start === "string"
          ? range.start.charCodeAt(0)
          : range.start,
      end: typeof range.end === "string" ? range.end.charCodeAt(0) : range.end,
    };

    return [rangeOfCode];
  }
};

class RandomString {
  #length: number;
  #range: RandomStringOfAny;
  #exclude: RandomStringOfExclude;

  #codes: number[] = [];

  constructor(
    length: number,
    range?: string | RandomStringRange | RandomStringRange[],
    exclude?: string | RandomStringRange | RandomStringRange[]
  ) {
    this.#length = length;

    if (typeof range === "undefined") {
      this.#range = new RandomStringOfRange();
    } else if (typeof range === "string") {
      this.#range = new RandomStringOfTemplate(range);
    } else {
      this.#range = new RandomStringOfRange(range);
    }

    if (typeof exclude === "undefined") {
      this.#exclude = new RandomStringOfExclude();
    } else {
      this.#exclude = new RandomStringOfExclude(exclude);
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

export const randomString = (
  length: number,
  options?: {
    template?: string;
    range?: RandomStringRange | RandomStringRange[];
    exclude?: string | RandomStringRange | RandomStringRange[];
  }
): RandomString => {
  if (options) {
    const range = options.template ? options.template : options.range;
    const exclude = options.exclude;
    const rStr = new RandomString(length, range, exclude);
    return rStr;
  } else {
    const rStr = new RandomString(length);
    return rStr;
  }
};

import * as types from "@/types";

const convert = (char: string) => {
  const code = char.charCodeAt(0);
  const hex = code.toString(16);
  return {
    code,
    hex,
    char,
  };
};

export const convertRangeOfCode = (
  range: string | types.RandomStringRange | types.RandomStringRange[]
): types.RandomStringRangeOfCode[] => {
  if (typeof range === "string") {
    const rangeOfCodes: types.RandomStringRangeOfCode[] = new Array(
      range.length
    );

    for (let i = 0; i < range.length; i++) {
      const char = range[i];

      rangeOfCodes[i] = {
        start: convert(char),
        end: convert(char),
      };
    }

    return rangeOfCodes;
  } else if (Array.isArray(range)) {
    const rangeOfCodes: types.RandomStringRangeOfCode[] = [];

    range.forEach((r) => {
      const ranges = convertRangeOfCode(r);
      const range = ranges.pop();
      if (range) {
        rangeOfCodes.push(range);
      }
    });

    return rangeOfCodes;
  } else {
    const startChar =
      typeof range.start === "string"
        ? range.start
        : String.fromCharCode(range.start);
    const endChar =
      typeof range.end === "string"
        ? range.end
        : String.fromCharCode(range.end);

    const rangeOfCode: types.RandomStringRangeOfCode = {
      start: convert(startChar),
      end: convert(endChar),
    };

    return [rangeOfCode];
  }
};

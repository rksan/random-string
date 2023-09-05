import * as types from "@/types";
import * as classes from "@/classes";

export const randomString = (
  length: number,
  options?: {
    src?: string | types.RandomStringRange | types.RandomStringRange[];
    exclude?: string | types.RandomStringRange | types.RandomStringRange[];
  }
): classes.RandomString => {
  if (options) {
    const rStr = new classes.RandomString(length, options.src, options.exclude);
    return rStr;
  } else {
    const rStr = new classes.RandomString(length);
    return rStr;
  }
};

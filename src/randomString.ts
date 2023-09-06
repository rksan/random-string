import * as types from "@/types";
import * as classes from "@/classes";

export const randomString = (
  length: number,
  options?: {
    src?: string | types.RandomStringRange | types.RandomStringRange[];
    exclude?: string | types.RandomStringRange | types.RandomStringRange[];
  }
): string => {
  if (options) {
    const rStr = new classes.RandomString(length, options.src, options.exclude);
    return rStr.toString();
  } else {
    const rStr = new classes.RandomString(length);
    return rStr.toString();
  }
};

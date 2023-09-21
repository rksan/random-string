export const getOptions = (
  start: string | number,
  end: string | number
): string[] => {
  const options: string[] = [];
  const s = typeof start === "string" ? start.charCodeAt(0) : start,
    e = typeof end === "string" ? end.charCodeAt(0) : end;

  for (let c: number = s; c <= e; c++) {
    options.push(String.fromCharCode(c));
  }

  return options;
};

//@ts-check
import { describe, it } from "mocha";
import { assert } from "chai";

import { randomString } from "@/index";

const META_CHARS = [
  "^",
  "$",
  ".",
  "+",
  "*",
  "/",
  "\\",
  "[",
  "]",
  "{",
  "}",
  "(",
  ")",
  "|",
  "?",
];
const META_CHARS_REG = new RegExp(`[\\${META_CHARS.join("\\")}]`, "g");
console.log("META_CHARS_REG", META_CHARS_REG.source);

const escapeMetaChar = (str: string) => {
  return str.replace(META_CHARS_REG, (match: string) => `\\${match}`);
};

const UTF8_20_2F = " !\"#$%&'()*+,-./";
const REG_20_2F = `[${escapeMetaChar(UTF8_20_2F)}]`;
console.log("REG_20_2F", REG_20_2F);

const UTF8_3A_40 = ":;<=>?@";
const REG_3A_40 = `[${escapeMetaChar(UTF8_3A_40)}]`;
console.log("REG_3A_40", REG_3A_40);

const UTF8_5B_60 = "[\\]^_`";
const REG_5B_60 = `[${escapeMetaChar(UTF8_5B_60)}]`;
console.log("REG_5B_60", REG_5B_60);

const UTF8_7B_7E = "{|}~";
const REG_7B_7E = `[${escapeMetaChar(UTF8_7B_7E)}]`;
console.log("REG_7B_7E", REG_7B_7E);

const DEFAULT_REG_SOURCE = `(${
  /[0-9A-Za-z]/.source
}|${REG_20_2F}|${REG_3A_40}|${REG_5B_60}|${REG_7B_7E})`;
console.log("DEFAULT_REG_SOURCE", DEFAULT_REG_SOURCE);

describe("randomString", () => {
  it("specify length 32", () => {
    const length = 32;
    const str = randomString(length);

    const reg = new RegExp(DEFAULT_REG_SOURCE, "g");
    const noStr = str.toString().replace(reg, "");

    assert.isOk(noStr === "", `str="${str}", noStr="${noStr}"`);
    assert.isOk(typeof str.toString() === "string", `${str}`);
    assert.isOk(
      str.toString().length === length,
      `str.length is not ${length}`
    );
    console.log("str=", str.toString());
  });

  it("specify length 16", () => {
    const length = 16;
    const str = randomString(length);

    const reg = new RegExp(DEFAULT_REG_SOURCE, "g");
    const noStr = str.toString().replace(reg, "");

    assert.isOk(noStr === "", `str="${str}", noStr="${noStr}"`);
    assert.isOk(
      str.toString().length === length,
      `str.length is not ${length}`
    );
    console.log("str=", str.toString());
  });

  it("specify length 8", () => {
    const length = 8;
    const str = randomString(length);

    const reg = new RegExp(DEFAULT_REG_SOURCE, "g");
    const noStr = str.toString().replace(reg, "");

    assert.isOk(noStr === "", `str="${str}", noStr="${noStr}"`);
    assert.isOk(str.toString().length === length, `str.length is not ${str}`);
    console.log("str=", str.toString());
  });

  it("Specify source by range of string", () => {
    const length = 16;
    const options = { src: { start: "0", end: "z" } };

    const str = randomString(length, options);

    const source = `(${/[0-9A-Za-z]/.source}|${REG_3A_40}|${REG_5B_60})`;
    const reg = new RegExp(source, "g");
    const noStr = str.toString().replace(reg, "");

    assert.isOk(noStr === "", `str="${str}", noStr="${noStr}"`);
    assert.isOk(
      str.toString().length === length,
      `str.length is not ${length}`
    );
    console.log("str=", str.toString());
  });

  it("Specify source by range of number", () => {
    const length = 16;
    const options = {
      src: { start: "0".charCodeAt(0), end: "z".charCodeAt(0) },
    };

    const str = randomString(length, options);

    const source = `(${/[0-9A-Za-z]/.source}|${REG_3A_40}|${REG_5B_60})`;
    const reg = new RegExp(source, "g");
    const noStr = str.toString().replace(reg, "");

    assert.isOk(noStr === "", `str="${str}", noStr="${noStr}"`);
    assert.isOk(
      str.toString().length === length,
      `str.length is not ${length}`
    );
    console.log("str=", str.toString());
  });

  it("specify src by range of Array", () => {
    const length = 16;
    const options = {
      src: [
        { start: "0", end: "9" },
        { start: "A", end: "Z" },
        { start: "a", end: "z" },
      ],
    };

    const str = randomString(length, options);

    const source = `${/[0-9A-Za-z]/.source}`;
    const reg = new RegExp(source, "g");
    const noStr = str.toString().replace(reg, "");

    assert.isOk(noStr === "", `str="${str}", noStr="${noStr}"`);
    assert.isOk(
      str.toString().length === length,
      `str.length is not ${length}`
    );
    console.log("str=", str.toString());
  });

  it("specify excludes by string", () => {
    const length = 16;
    const options = {
      src: {
        start: "0",
        end: "z",
      },
      exclude: UTF8_3A_40 + UTF8_5B_60,
    };
    const str = randomString(length, options);

    const source = `${/[0-9A-Za-z]/.source}`;
    const reg = new RegExp(source, "g");
    const noStr = str.toString().replace(reg, "");

    assert.isOk(
      noStr === "",
      `str="${str}", noStr="${noStr}", str=${JSON.stringify(
        str.toJSON(),
        null,
        2
      )}`
    );
    assert.isOk(
      str.toString().length === length,
      `str.length is not ${length}`
    );
    console.log("str=", str.toString());
  });

  it("specify excludes of range of Array", () => {
    const length = 16;
    const options = {
      src: {
        start: "0",
        end: "z",
      },
      exclude: [
        {
          start: ":",
          end: "@",
        },
        {
          start: "[",
          end: "`",
        },
      ],
    };
    const str = randomString(length, options);

    const source = `${/[0-9A-Za-z]/.source}`;
    const reg = new RegExp(source, "g");
    const noStr = str.toString().replace(reg, "");

    assert.isOk(
      noStr === "",
      `str="${str}", noStr="${noStr}"}, str=${JSON.stringify(
        str.toJSON(),
        null,
        2
      )}`
    );
    assert.isOk(
      str.toString().length === length,
      `str.length is not ${length}`
    );
    console.log("str=", str.toString());
  });

  it("specify src of string", () => {
    const length = 16;
    const options = {
      src: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    };
    const str = randomString(length, options);

    const source = `${/[0-9A-Za-z]/.source}`;
    const reg = new RegExp(source, "g");
    const noStr = str.toString().replace(reg, "");

    assert.isOk(
      noStr === "",
      `str="${str}", noStr="${noStr}"}, str=${JSON.stringify(
        str.toJSON(),
        null,
        2
      )}`
    );
    assert.isOk(
      str.toString().length === length,
      `str.length is not ${length}`
    );
    console.log("str=", str.toString());
  });
});

//@ts-check
import { describe, it } from "mocha";
import { assert } from "chai";

import { randomString } from "@/index";

describe("randomString", () => {
  it("specify length 32", () => {
    const length = 32;
    const id = randomString(length);
    assert.isOk(typeof id.toString() === "string", `${id}`);
    assert.isOk(id.toString().length === length, `id.length is not ${length}`);
    console.log("id=", id.toString());
  });

  it("specify length 16", () => {
    const length = 16;
    const id = randomString(length);
    assert.isOk(typeof id.toString() === "string", `${id.toString()}`);
    assert.isOk(id.toString().length === length, `id.length is not ${length}`);
    console.log("id=", id.toString());
  });

  it("specify length 8", () => {
    const length = 8;
    const id = randomString(length);
    assert.isOk(typeof id.toString() === "string", `${id}`);
    assert.isOk(id.toString().length === length, `id.length is not ${length}`);
    console.log("id=", id.toString());
  });

  it("specify range of string", () => {
    const length = 8;
    const options = { range: { start: "A", end: "z" } };
    const id = randomString(length, options);

    assert.isOk(/([A-Za-z]|\[\\\]^~ _`)/.test(id.toString()), `${id}`);
    assert.isOk(id.toString().length === length, `id.length is not ${length}`);
    console.log("id=", id.toString());
  });

  it("specify excludes of string", () => {
    const length = 16;
    const options = {
      range: {
        start: "0",
        end: "z",
      },
      exclude: ":;<=>?@[\\]^~ _`",
    };
    const id = randomString(length, options);

    assert.isOk(/([0-9A-Za-z])/.test(id.toString()), `${id}`);
    assert.isOk(id.toString().length === length, `id.length is not ${length}`);
    console.log("id=", id.toString());
    //console.log("id=", JSON.stringify(id.toJSON()));
  });

  it("specify range of Array", () => {
    const length = 16;
    const options = {
      range: [
        { start: "0", end: "9" },
        { start: "A", end: "Z" },
        { start: "a", end: "z" },
      ],
      exclude: ":;<=>?@[\\]^~ _`",
    };
    const id = randomString(length, options);

    assert.isOk(/([0-9A-Za-z])/.test(id.toString()), `${id}`);
    assert.isOk(id.toString().length === length, `id.length is not ${length}`);
    console.log("id=", id.toString());
    //console.log("id=", JSON.stringify(id.toJSON(), null, 2));
  });
});

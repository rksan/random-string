import * as types from "@/types";

export class RandomStringOfTemplate implements types.RandomStringOfAny {
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

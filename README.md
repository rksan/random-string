[![Coverage Status](https://coveralls.io/repos/github/rksan/random-string/badge.svg?branch=main)](https://coveralls.io/github/rksan/random-string?branch=main)

# random-string

## overview

ランダムな文字列を生成します

## Requirement

- Node.js - v18.x

## Install

@TODO

## Usage

```typescript
import { randomString } from "@rksan/random-string";

const str = randomString(16);

console.log(`randam string is "${str}"`);
```

## Featuires

### syntax

```typescript
const str: string = randomString(
  length: number,
  options?: {
    src?: string
     | {start: string, end: string}
     | [{ start: string, end: string }],
    exclude?: string
     | { start: string, end: string }
     | [ { start: string, end: string } ]
  }
)
```

### args

#### `length`

`@type` `{number}`

生成する文字列の長さ

#### `options?`

`@type` `{src?: object, exclude?: object}`

生成する文字列のオプション

##### `options?.src?`

`@type` `{string | { start: string, end: string } | [{ start: string, end: string }]`

生成される文字列のソースを指定する。

UTF8コードの範囲で、必ず `src.start <= src.end` にする必要があります。

`exp.`

```typescript
// string
const str = randomString(8, {
  src: "0123456789",
});

// object
const str = randomString(8, {
  src: {
    start: "a",
    end: "z",
  },
});

// object array
const str = randomString(8, {
  src: [
    {
      start: "0",
      end: "9",
    },
    {
      start: "A",
      end: "Z",
    },
    {
      start: "a",
      end: "z",
    },
  ],
});
```

##### `options?.exclude`

`@type` `{string | {start: string, end: string} | [{start: string, end: string}]}`

生成される文字列から除外する文字を指定する

UTF8コードの範囲で、必ず `exclude.start <= exclude.end` にする必要があります。

`exp.`

```typescript
// string
const str = randomString(8, {
  src: {
    start: "0",
    end: "z",
  },
  exclude: ":;<=>?@[\\]^_`",
});

// object
const str = randomString(8, {
  src: {
    start: "0",
    end: "Z",
  },
  exclude: {
    start: ":",
    end: "@",
  },
});

// object array
const str = randomString(8, {
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
});
```

# Reference

- [UTF-8 encoding table and Unicode characters | utf8-chartable.de](https://www.utf8-chartable.de/)

# Author

@rksan

# Licence

MIT

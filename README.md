[![Coverage Status](https://coveralls.io/repos/github/rksan/random-string/badge.svg?branch=main)](https://coveralls.io/github/rksan/random-string?branch=main)

# random-string

## overview

UTF-8の範囲内でランダムな文字列を生成

## Usage

```javascript
import { randomString } from "@rksan/random-string";

const rdmStr = randomString(16);

console.log(`randam string is "${rdmStr.toString()}"`);
```

## Requirement

- Node.js - v18.x

## Install

```shell
npm i -D @rksan/random-string
```

## syntax

```typescript
const rdmStr: RandomString = randomString(
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

### arguments

#### `length`

`@type` `{number}`

生成する文字列の長さ

#### `options?`

`@type` `{src?: object, exclude?: object}`

生成する文字列のオプション

##### `options?.src?`

`@type` `{string | { start: string, end: string } | [{ start: string, end: string }]`

`@default` `{{ start: "!", end: "~" }}`

生成される文字列のソースを指定する。

UTF8コードの範囲で、必ず `src.start <= src.end` にする必要があります。

`exp.`

```typescript
// Not specified
const rdmStr = randomString(8);

// Specified by String
const rdmStr = randomString(8, {
  src: "0123456789",
});

// Specified by Object
const rdmStr = randomString(8, {
  src: {
    start: "a",
    end: "z",
  },
});

// Specified by Object array
const rdmStr = randomString(8, {
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

- `@type` `{string | {start: string, end: string} | [{start: string, end: string}]}`
- `@default` `undefined`

生成される文字列から除外する文字を指定する

UTF8コードの範囲で、必ず `exclude.start <= exclude.end` にする必要があります。

`exp.`

```typescript
// Not specified
const rdmStr = randomString(8, {
  src: {
    start: "0",
    end: "z",
  },
});

// Specified by String
const rdmStr = randomString(8, {
  src: {
    start: "0",
    end: "z",
  },
  exclude: ":;<=>?@[\\]^_`",
});

// Specified by Object
const rdmStr = randomString(8, {
  src: {
    start: "0",
    end: "Z",
  },
  exclude: {
    start: ":",
    end: "@",
  },
});

// Specified by Object array
const rdmStr = randomString(8, {
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

### return

#### `rdmStr`

`@type` `{RandomString}`

### `interface RandomString`

```tpyescript
interface RandomString{
  toString(): string;
}
```

#### `methods`

##### `toString()`

`@param` `none`
`@return` `{string}` 生成されたランタム文字列

`exp.`

```typescript
const rdmStr = randomString(8);

const str: string = rdmStr.toString();

console.log("str=", str);
```

# Reference

- [UTF-8 encoding table and Unicode characters | utf8-chartable.de](https://www.utf8-chartable.de/)

- [Math.random() | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

# Author

@rksan [https://github.com/rksan | github](https://github.com/rksan)

# Licence

MIT

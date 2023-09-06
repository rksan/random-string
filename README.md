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

生成する文字列の長さ

`@type` `number`

#### `options?`

生成する文字列のオプション

`@type` `{ src?: object, exclude?: object }`

##### `options?.src?`

生成される文字列のソース

UTF8コードの範囲で、必ず `src.start <= src.end` にする必要がある

`@type` `string | { start: string, end: string } | Array<{ start: string, end: string }>`

- `string` : 指定された文字列のみを使用する
- `{ start, end }` : `start`から`end`までのUTF8コード範囲内にある文字の全てを使用する
- `Array<{start, end}>` : １文字を出力する都度、渡された`Array`からランダムに`{start, end}`を取得し、取得した`start`から`end`までのUTF8コード範囲内にある文字の全てを使用する

`@default` `{ start: "!", end: "~" }`

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

生成される文字列から除外する文字

UTF8コードの範囲で、必ず `exclude.start <= exclude.end` にする必要がある

`@type` `{string | {start: string, end: string} | [{start: string, end: string}]}`

- `string` : 指定された文字列は除外される
- `{start, end}` : 指定された`start`から`end`までのUTF8文字は全て除外される
- `Array<{start, end}>` : 配列として指定された全ての`start`から`end`までのUTF8文字は全て除外される

`@default` `undefined`

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

ランダムな文字列を含んだオブジェクト

`toString()`メソッドを含んでいるので`console.log(``${rdmStr}``)`で、コンソールにはランダム文字列が出力される

`@type` `{RandomString}`

### `interface RandomString`

```tpyescript
interface RandomString{
  toString(): string;
}
```

#### `methods`

##### `toString()`

生成されたランダム文字列を返す

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

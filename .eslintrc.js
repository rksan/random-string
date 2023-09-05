// @ts-check

/** @type {import("eslint").Linter.Config} */
module.exports = {
  
  // 全てのファイルに対する共通設定
  rules: {
    "comma-dangle": ["error", { objects: "only-multiline" }], // 好みで
  },

  //...(略)...

  // ファイル個別の設定
  overrides:{
    // [typescript]
    /** @type {import("eslint").Linter.ConfigOverride<import("eslint").Linter.RulesRecord>} */
    {
      files: "**/*.{ts,tsx}",
      env: {
        es6: true,
        node:true,
        // etc...
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking", // 任意
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },

    // [javascript]
    /** @type {import("eslint").Linter.ConfigOverride<import("eslint").Linter.RulesRecord>} */
    {
      files "**/*.{js,cjs,mjs}"
      env: {
        es2022: true,
        node: true,
        // etc...
      },
      extends: [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "prettier",
      ],
      parser: "@babel/eslint-parser",
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-env"],
        },
      },
    },

    // [json]
    /** @type {import("eslint").Linter.ConfigOverride<import("eslint").Linter.RulesRecord>} */
    {
      files: "**/*.json",
      extends: [
        "eslint:recommended",
        "plugin:jsonc/recommended-with-jsonc",
        "plugin:jsonc/prettier",
        "prettier",
      ],
      parser: "jsonc-eslint-parser",
      rules: {
        "jsonc/comma-dangle": ["error", "never"], // JSON.parse() でエラるのでほぼ必須
      },
    },
  },
};

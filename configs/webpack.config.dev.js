//@ts-check
"use strict";

const path = require("path");
const merge = require("lodash/merge");
const comomConfig = require("./webpack.config.common");

const appRootPath = require("app-root-path");
const root = appRootPath.toString();

/** @type {import("webpack").Configuration} */
const config = {
  mode: "development",

  entry: path.join(root, "/src/index.ts"),

  devtool: "inline-source-map",

  output: {
    path: path.resolve(root, "./.build"),
    publicPath: "/",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "random-string",
    filename: "index.js",
  },

  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ }],
  },
};

/** @type {import("webpack").Configuration} */
module.exports = merge(comomConfig, config);

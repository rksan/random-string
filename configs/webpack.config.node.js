// @ts-check
const path = require("path");
const merge = require("lodash/merge");
const appRootPath = require("app-root-path");
const root = appRootPath.toString();

const devConfig = require("./webpack.config.dev");

const webpackConfig = {
  output: {
    path: path.resolve(root, "./.lib"),
    libraryTarget: "commonjs",
    filename: "index.js",
  },
  devtool: false,
};

/** @type {import("webpack").Configuration} */
module.exports = merge(devConfig, webpackConfig);

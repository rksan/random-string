//@ts-check
"use strict";

const path = require("path");

const appRootPath = require("app-root-path");
const root = appRootPath.toString();

/** @type {import("webpack").Configuration} */
module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(root, "./src"),
    },
  },
};

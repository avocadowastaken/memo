"use strict";

const babelPlugin = require("rollup-plugin-babel");
const prettierPlugin = require("rollup-plugin-prettier");
const nodeResolvePlugin = require("rollup-plugin-node-resolve");
const { sizeSnapshot } = require("rollup-plugin-size-snapshot");

const pkg = require("./package.json");

module.exports = [
  createConfig({
    target: "es5",
    outputFormat: "cjs",
    outputFile: pkg.main,
  }),

  createConfig({
    target: "es5",
    outputFormat: "es",
    outputFile: pkg.module,
  }),

  createConfig({
    target: "es2015",
    outputFormat: "es",
    outputFile: pkg.es2015,
  }),
];

function createConfig({ target, outputFile, outputFormat }) {
  return {
    input: "./src/index.ts",

    output: {
      sourcemap: false,
      file: outputFile,
      format: outputFormat,
    },

    plugins: [
      nodeResolvePlugin({ extensions: [".ts"] }),

      babelPlugin({
        babelrc: false,
        runtimeHelpers: false,
        extensions: [".ts"],
        presets: [
          [
            "@babel/preset-env",
            {
              loose: true,
              modules: false,
              targets: target === "es5" ? undefined : { node: "6.5.0" },
            },
          ],
        ],
      }),

      prettierPlugin({ parser: "babylon" }),

      sizeSnapshot({ matchSnapshot: process.env.CI === "true" }),
    ],
  };
}

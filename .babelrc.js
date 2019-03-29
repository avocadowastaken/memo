"use strict";

module.exports = api => {
  const isTest = api.env("test");

  api.cache(() => JSON.stringify({ isTest }));

  const presets = ["@babel/preset-typescript"];
  const plugins = [
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ];

  if (isTest) {
    presets.unshift([
      "@babel/preset-env",
      { loose: true, modules: "commonjs", targets: { node: true } },
    ]);
  }

  return { presets, plugins };
};

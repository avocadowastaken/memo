"use strict";

module.exports = api => {
  const isTest = api.env("test");

  api.cache(() => JSON.stringify({ isTest }));

  return {
    presets: [
      isTest && [
        "@babel/preset-env",
        { loose: true, modules: "commonjs", targets: { node: true } },
      ],

      "@babel/preset-typescript",
    ].filter(Boolean),

    plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]],
  };
};

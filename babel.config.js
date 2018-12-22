"use strict";

module.exports = api => {
  const isTest = api.env("test");

  api.cache(() => JSON.stringify({ isTest }));

  return {
    presets: [
      isTest && [
        "@babel/preset-env",
        {
          modules: "commonjs",
          targets: { node: "8.3.0" },
        },
      ],

      "@babel/preset-typescript",
    ].filter(Boolean),

    plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]],
  };
};

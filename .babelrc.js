'use strict';

// module.exports = api => {
//   const isTest = api.env("test");
//
//   api.cache(() => JSON.stringify({ isTest }));
//
//   const presets = ["@babel/preset-typescript"];
//   const plugins = [
//     ["@babel/plugin-proposal-class-properties", { loose: true }],
//   ];
//
//   if (isTest) {
//     presets.unshift([
//       "@babel/preset-env",
//       { loose: true, modules: "commonjs", targets: { node: true } },
//     ]);
//   }
//
//   return { presets, plugins };
// };

const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  compact: false,
  presets: [
    isTest && '@babel/preset-typescript',
    isTest && ['@babel/preset-env', { targets: { node: true } }],
  ].filter(Boolean),
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
  ],
};

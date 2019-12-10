'use strict';

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

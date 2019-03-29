"use strict";

module.exports = {
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  coveragePathIgnorePatterns: ["/__tests__/", "/__testutils__/"],
  coverageThreshold: {
    global: { statements: 100, branches: 100, functions: 100, lines: 100 },
  },
};

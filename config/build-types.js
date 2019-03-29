"use strict";

const path = require("path");
const execa = require("execa");
const { manifest } = require("@pika/plugin-build-types");

module.exports = { manifest, build };

async function build({ cwd, out, reporter }) {
  const tscBin = path.join(cwd, "node_modules/.bin/tsc");
  const tsConfigPath = path.join(cwd, "tsconfig.typings.json");

  await execa(
    tscBin,
    [
      "-d",
      "--emitDeclarationOnly",
      "--declarationMap",
      "false",
      "--project",
      tsConfigPath,
      "--declarationDir",
      path.join(out, "dist-types/"),
    ],
    { cwd },
  );

  reporter.created(path.join(out, "dist-types", "index.d.ts"), "types");
}

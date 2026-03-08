/** @type {import("@rtk-query/codegen-openapi").ConfigFile} */
const config = {
  schemaFile: "./schemas/Line.json",
  apiFile: "./store/emptyLineApi.ts",
  apiImport: "emptyLineApi",
  outputFile: "./store/lineApi.ts",
  exportName: "lineApi",
  hooks: true,
};

module.exports = config;

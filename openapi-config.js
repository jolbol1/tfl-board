/** @type {import("@rtk-query/codegen-openapi").ConfigFile} */
const config = {
  schemaFile: "./schemas/StopPoint.json",
  apiFile: "./store/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./store/stopPointApi.ts",
  exportName: "stopPointApi",
  hooks: true,
};

module.exports = config;

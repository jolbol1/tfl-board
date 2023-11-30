import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./schemas/StopPoint.json",
  apiFile: "./store/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./store/stopPointApi.ts",
  exportName: "stopPointApi",
  hooks: true,
};

export default config;

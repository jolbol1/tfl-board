import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./schemas/Line.json",
  apiFile: "./store/emptyLineApi.ts",
  apiImport: "emptyLineApi",
  outputFile: "./store/lineApi.ts",
  exportName: "lineApi",
  hooks: true,
};

export default config;

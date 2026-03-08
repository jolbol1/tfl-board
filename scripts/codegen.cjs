const path = require("node:path");
const { generateEndpoints, parseConfig } = require("@rtk-query/codegen-openapi");

async function run() {
  const configPaths = process.argv.slice(2);

  if (configPaths.length === 0) {
    throw new Error("Expected at least one codegen config path.");
  }

  for (const configPath of configPaths) {
    const absoluteConfigPath = path.resolve(process.cwd(), configPath);
    const config = require(absoluteConfigPath);
    const parsedConfigs = parseConfig(config);

    for (const parsedConfig of parsedConfigs) {
      await generateEndpoints(parsedConfig);
    }
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

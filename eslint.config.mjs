import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const config = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [".next/**", "node_modules/**", "store/lineApi.ts", "store/stopPointApi.ts"],
  },
  {
    files: [
      "next.config.js",
      "postcss.config.js",
      "openapi-config.js",
      "openapi-config2.js",
      "scripts/**/*.cjs",
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default config;

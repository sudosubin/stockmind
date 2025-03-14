import preact from "@preact/preset-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  build: { minify: "terser" },
  esbuild: { legalComments: "external" },
  plugins: [preact(), vanillaExtractPlugin()],
  resolve: { alias: { lodash: "lodash-es", wouter: "wouter-preact" } },
});

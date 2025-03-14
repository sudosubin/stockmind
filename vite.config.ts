import preact from "@preact/preset-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  build: { minify: "terser" },
  esbuild: { legalComments: "external" },
  plugins: [
    createHtmlPlugin({ minify: true }),
    preact(),
    vanillaExtractPlugin(),
  ],
  resolve: { alias: { lodash: "lodash-es", wouter: "wouter-preact" } },
});

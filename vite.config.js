import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import postcss from "./postcss.config.cjs";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    assetsDir: "./",
  },
  css: [postcss],
  assetsInclude: ["**/*.txt"],
  plugins: [svelte()],
});

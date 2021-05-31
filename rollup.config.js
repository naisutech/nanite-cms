import autoPreprocess from "svelte-preprocess";
import svelte from "rollup-plugin-svelte";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import html from "@rollup/plugin-html";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
const production = false;

export default {
  input: "src/nano-cms.ts",
  plugins: [
    svelte({
      preprocess: autoPreprocess(),
      include: "src/**/*.svelte",
    }),
    typescript({ sourceMap: !production }),
    resolve({ browser: true }),
    html({
      meta: [
        {
          name: "charset",
          content: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
      ],
      title: "Nano CMS | Tiny content for tiny sites",
    }),
    !production && livereload("dist"),
    !production && serve("dist"),
  ],
  output: {
    sourcemap: true,
    format: "iife",
    name: "nanoCms",
    file: "dist/nano-cms.js",
  },
  watch: {
    clearScreen: true,
  },
};

import autoPreprocess from "svelte-preprocess";
import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import html from "@rollup/plugin-html";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
const production = false;

export default {
  input: "src/front-end/app.ts",
  plugins: [
    svelte({
      preprocess: autoPreprocess(),
      include: "src/front-end/**/*.svelte",
    }),
    commonjs(),
    typescript({ sourceMap: !production }),
    resolve({ browser: true, dedupe: ["svelte"] }),
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
      title: "Nanite CMS | Tiny content for tiny sites",
    }),
    !production && livereload("dist"),
    !production && serve("dist"),
  ],
  output: {
    sourcemap: true,
    format: "iife",
    name: "naniteCMS",
    file: "dist/nanite-cms.js",
  },
  watch: {
    clearScreen: true,
  },
};

/**
 * Front-end app goes here
 */

import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "Gregory",
  },
});

export default app;

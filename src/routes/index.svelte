<script type="text/typescript">
  import hjs from "highlight.js";
  import { onMount } from "svelte";
  import Control from "../components/form/Control.svelte";
  import Code from "../components/form/Code.svelte";

  onMount(async () => {
    hjs.highlightAll();
  });
</script>

<div class="container self-center fluid-max-width">
  <h1>Site management</h1>
  <section class="section">
    <h2>Meta data</h2>
    <Control label="Title" value="Gregory" type="text" name="title" />
    <Control
      label="Description"
      value="Gregory"
      type="text"
      name="description"
    />
  </section>
  <section class="section">
    <h2>Scripts & styles</h2>
    <h3>Styles</h3>
    <Control label="Global styles">
      <Code content={""} />
    </Control>
    <h3>Scripts</h3>
    <Control label="Head script">
      <Code content={""} />
    </Control>
    <Control label="Footer script">
      <Code content={""} />
    </Control>
  </section>
</div>

<style>
</style>

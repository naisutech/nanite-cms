<script lang="ts">
  import Nav from "../components/layout/Nav.svelte";

  export let segment: string;
</script>

<svelte:head>
  <title>Nanite CMS | Tiny content for tiny sites</title>
</svelte:head>

{#if segment !== "login"}
  <Nav {segment} />
{/if}

<main>
  <slot />
</main>

<style>
</style>

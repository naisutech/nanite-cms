<script lang="ts">
  import { stores } from '@sapper/app'
  import FullScreenLoader from '../components/elements/FullScreenLoader.svelte'
  const { preloading } = stores()
  import Nav from '../components/layout/Nav.svelte'
  export let segment: string

  let containerWidth = null
  let isMobile = false
  $: isMobile = containerWidth < 640
</script>

<svelte:head>
  <title>Nanite CMS | Tiny content for tiny sites</title>
</svelte:head>

{#if segment !== 'login'}
  <Nav {segment} />
{/if}

<main
  class="position relative"
  style="--padding: {segment === 'login' ? '0px' : isMobile ? '8px' : '20px'}"
  bind:clientWidth={containerWidth}
>
  {#if $preloading}
    <FullScreenLoader />
  {:else}
    <slot />
  {/if}
</main>

<style>
  main {
    padding: var(--padding);
  }
</style>

<script type="text/typescript">
  import { fade } from 'svelte/transition'
  import Loader from './Loader.svelte'
</script>

<div
  in:fade={{ duration: 200 }}
  out:fade={{ duration: 200 }}
  class="position absolute fill-container flex align-center justify-center bg-5"
>
  <div class="flex justify-center align-center column">
    <Loader color="var(--col-dark)" />
    <span class="color-dark">Loading ...</span>
  </div>
</div>

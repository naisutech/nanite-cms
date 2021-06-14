<script type="text/typescript">
  export let type: string = "text";
  export let value: string = null;
  export let name: string = null;
  export let label: string = null;
  export let inline: boolean = false;
  export let placeholder: string = null;
  export let labelClasess: string = null;
  export let inputClasses: string = null;

  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }
</script>

<div class="flex {inline ? 'row' : 'column'}">
  {#if label}
    <label class={labelClasess} for={name} style="flex: 1;">{label}</label>
  {/if}
  {#if !Object.keys($$slots).length}
    <input
      {placeholder}
      {name}
      use:typeAction
      id={name}
      class={inputClasses}
      bind:value
      style="flex: 5;"
    />
  {/if}
  <slot />
</div>

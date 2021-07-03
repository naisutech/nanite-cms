<script type="text/typescript">
  import { makeStyles } from '../../lib/Utils'

  export let type: string = 'text'
  export let value: string = null
  export let name: string = null
  export let label: string = null
  export let inline: boolean = false
  export let placeholder: string = null
  export let labelClasess: string = null
  export let inputClasses: string = null
  export let size: string = 'default'
  export let containerClasses: string = null
  export let containerStyles: string = null
  export let autocomplete: string = 'on'

  const sizes = {
    xlarge: {
      ['font-size']: 'var(--fnt-xl)',
      ['font-weight']: '300',
      height: '6.4rem',
      padding: '0 2.8rem'
    },
    large: {
      ['font-size']: 'var(--fnt-l)',
      ['font-weight']: '300',
      height: '4.2rem',
      padding: '0 2.4rem'
    },
    default: {
      ['font-size']: 'var(--fnt-d)',
      ['font-weight']: '300',
      height: '3.8rem',
      padding: '0 1.8rem'
    },
    small: {
      ['font-size']: 'var(--fnt-s)',
      ['font-weight']: '300',
      height: '3.6rem',
      padding: '0 1.4rem'
    },
    xsmall: {
      ['font-size']: 'var(--fnt-xs)',
      ['font-weight']: '300',
      height: '2.8rem',
      padding: '0 1.1rem'
    }
  }

  let inputStyles = null
  $: inputStyles = makeStyles(sizes[size])
  $: labelOptions = {
    ['font-size']: sizes[size]['font-size'],
    ['font-weight']: sizes[size]['font-weight']
  }
  $: labelStyles = makeStyles(labelOptions)

  function typeAction(node: HTMLInputElement) {
    node.type = type
  }
</script>

<div
  class="flex {inline ? 'row align-center' : 'column'} nanite-control"
  class:containerClasses
  style={containerStyles}
>
  {#if label}
    <label class={labelClasess} for={name} style={labelStyles}>{label}</label>
  {/if}
  {#if !Object.keys($$slots).length}
    <input
      {autocomplete}
      style={inputStyles}
      {placeholder}
      {name}
      use:typeAction
      id={name}
      class={inputClasses}
      bind:value
    />
  {/if}
  <slot />
</div>

<style>
  .nanite-control label {
    flex: 2;
    flex-shrink: 0;
    width: 100%;
  }
  .nanite-control input {
    flex: 5;
    flex-shrink: 0;
    all: unset;
    box-sizing: border-box;
    -webkit-appearance: none;

    width: 100%;
    background-color: var(--col-nanite-5);
    color: var(--col-nanite-2);
  }

  input::placeholder {
    color: var(--col-disabled);
  }
</style>

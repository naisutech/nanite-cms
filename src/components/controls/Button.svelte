<script type="text/typescript">
  import { createEventDispatcher } from 'svelte'
  export let type: string = 'button'
  export let text: string = 'Touch me'
  export let outline: boolean = false
  export let backgroundColor: string = 'var(--col-nanite-1)'
  export let textColor: string = 'var(--col-nanite-5)'
  export let buttonClasses: string = null
  export let textClasses: string = null
  export let fill: boolean = false

  const dispatch = createEventDispatcher()

  function handleClick() {
    dispatch('click')
  }

</script>

<button
  on:click={handleClick}
  class={buttonClasses}
  {type}
  style="--bg-color: {outline
    ? undefined
    : backgroundColor}; --button-behaviour: {fill ? 'flex' : 'inline-flex'}"
>
  <span class={textClasses} style="--text-color: {textColor};">{text}</span>
</button>

<style>
  button {
    all: unset;
    display: var(--button-behaviour);
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color);
    color: var(--text-color);
    padding: 6px 18px;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid;
    border-top-color: #eee;
    border-left-color: #eee;
    border-right-color: #555;
    border-bottom-color: #555;
  }

  button:active {
    filter: brightness(90%);
    border-right-color: #eee;
    border-bottom-color: #eee;
  }

  button span {
    color: var(--text-color);
    white-space: nowrap;
    flex-shrink: 0;
    font-size: var(--fnt-d);
  }

</style>

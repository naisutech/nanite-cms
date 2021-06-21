<script type="text/typescript">
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher() // event handling

  export let type: string = 'button'
  export let text: string = 'Touch me'
  export let outline: boolean = false
  export let preset: string = 'primary'
  export let backgroundColor: string = 'var(--col-nanite-1)'
  export let textColor: string = 'var(--col-nanite-5)'
  export let buttonClasses: string = null
  export let textClasses: string = null
  export let fullWidth: boolean = false

  function handleClick() {
    dispatch('click')
  }

  interface TButtonDef {
    ['background-color']: string
    color: string
    border: string
  }

  interface TButtonDefs {
    [key: string]: { [key: string]: TButtonDef }
  }

  // Nanite Button Definitions
  const buttonDefs: TButtonDefs = {
    primary: {
      default: {
        ['background-color']: `var(--col-nanite-1)`,
        color: `var(--col-nanite-5)`,
        border: 'none'
      },
      outline: {
        ['background-color']: `none`,
        color: `var(--col-nanite-1)`,
        border: '2px solid var(--col-nanite-1)'
      }
    },
    secondary: {
      default: {
        ['background-color']: `var(--col-nanite-1)`,
        color: `var(--col-nanite-5)`,
        border: 'none'
      },
      outline: {
        ['background-color']: `none`,
        color: `var(--col-nanite-1)`,
        border: '2px solid var(--col-nanite-1)'
      }
    },
    link: {
      default: {
        ['background-color']: `var(--col-nanite-1)`,
        color: `var(--col-nanite-5)`,
        border: 'none'
      },
      outline: {
        ['background-color']: `none`,
        color: `var(--col-nanite-1)`,
        border: '2px solid var(--col-nanite-1)'
      }
    },
    tertiary: {
      default: {
        ['background-color']: `var(--col-nanite-1)`,
        color: `var(--col-nanite-5)`,
        border: 'none'
      },
      outline: {
        ['background-color']: `none`,
        color: `var(--col-nanite-1)`,
        border: '2px solid var(--col-nanite-1)'
      }
    }
  }

</script>

<button
  on:click={handleClick}
  class={buttonClasses}
  {type}
  style="--bg-color: {outline
    ? undefined
    : backgroundColor}; --button-behaviour: {fullWidth
    ? 'flex'
    : 'inline-flex'}"
>
  <span class={textClasses} style="--text-color: {textColor};">{text}</span>
</button>

<style>
  button {
    all: unset;
    display: var(--button-behaviour);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color);
    color: var(--text-color);
    padding: 6px 18px;
    cursor: pointer;
  }

  button:active {
    filter: brightness(90%);
  }

  button span {
    font-weight: 700;
    font-size: var(--fnt-d);
    color: var(--text-color);
    text-transform: uppercase;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

</style>

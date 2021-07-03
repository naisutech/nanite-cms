<script type="text/typescript">
  import { makeStyles } from '../../lib/Utils'
  import Loader from '../elements/Loader.svelte'

  export let type: string = 'button'
  export let text: string = 'Touch me'
  export let backgroundColor: string = null
  export let outlineBorderColor: string = null
  export let outlineTextColor: string = null
  export let textColor: string = null
  export let hoverColor: string = null
  export let buttonClasses: string = null
  export let textClasses: string = null
  export let fill: boolean = false
  export let outline: boolean = false
  export let size: string = 'default'
  export let loading: string = null
  export let disabled: boolean = false

  const sizes = {
    xlarge: {
      ['font-size']: 'var(--fnt-xl)',
      ['font-weight']: '300',
      height: '6.4rem',
      padding: '0 6.4rem'
    },
    large: {
      ['font-size']: 'var(--fnt-l)',
      ['font-weight']: '400',
      height: '4.2rem',
      padding: '0 4.2rem'
    },
    default: {
      ['font-size']: 'var(--fnt-d)',
      ['font-weight']: '500',
      height: '3.8rem',
      padding: '0 3.2rem'
    },
    small: {
      ['font-size']: 'var(--fnt-s)',
      ['font-weight']: '600',
      height: '3.6rem',
      padding: '0 2.4rem'
    },
    xsmall: {
      ['font-size']: 'var(--fnt-xs)',
      ['font-weight']: '700',
      height: '2.8rem',
      padding: '0 1.8rem'
    }
  }

  $: buttonStylesObject = {
    ['background-color']: outline
      ? 'transparent'
      : disabled
      ? 'var(--col-disabled)'
      : backgroundColor,
    ['--hover-color']: hoverColor ? hoverColor : null,
    ['border-color']: disabled
      ? 'var(--col-disabled)'
      : outline
      ? outlineBorderColor || backgroundColor
      : null,
    width: fill ? '100%' : 'auto',
    height: sizes[size]['height'],
    padding: sizes[size]['padding']
  }
  $: buttonStyleString = makeStyles(buttonStylesObject)

  $: textStylesObject = {
    color: outline ? outlineTextColor || textColor : textColor,
    'font-size': sizes[size]['font-size'],
    'font-weight': sizes[size]['font-weight']
  }
  $: textStyleString = makeStyles(textStylesObject)

  // style action
  function styleAction(node: HTMLButtonElement) {
    node.type = type
  }
</script>

<button
  use:styleAction
  on:click
  class:outline
  class:buttonClasses
  style={buttonStyleString}
  {disabled}
>
  {#if !loading}
    <span class="button-text" class:textClasses style={textStyleString}
      >{text}</span
    >
  {:else}
    <Loader size={sizes[size]['font-size']} color={textColor} />
    <span class="button-text" style={textStyleString}>{loading}</span>
  {/if}
</button>

<style>
  button {
    all: unset;
    display: inline-flex;
    box-sizing: border-box;
    -webkit-appearance: none;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: 0 18px;
    cursor: pointer;
    border: 2px solid transparent;
  }

  button:hover {
    background-color: var(--hover-color);
    filter: brightness(105%);
  }

  button:active {
    filter: brightness(90%);
  }

  button span.button-text {
    font-size: var(--fnt-d);
    color: var(--text-color);
    flex-shrink: 0;
    text-transform: uppercase;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border: 2px solid transparent;
    margin: 0 4px;
  }

  button[disabled] {
    cursor: not-allowed;
  }

  button[disabled]:active {
    filter: none;
  }
</style>

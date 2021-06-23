<script type="text/typescript">
  import { createEventDispatcher } from 'svelte'
  import { makeStyles } from '../../lib/Utils'
  const dispatch = createEventDispatcher() // event handling
  import logo from '../../../static/images/Logo.svg'
  export let type: string = 'button'
  export let text: string = 'Touch me'
  export let backgroundColor: string = null
  export let outlineBorderColor: string = null
  export let outlineTextColor: string = null
  export let textColor: string = null
  export let hoverColor: string = null
  export let buttonClasses: string = null
  export let textClasses: string = null
  export let inline: boolean = false
  export let fill: boolean = false
  export let outline: boolean = false
  export let size: string = 'default'
  export let loading: boolean = null

  const sizes = {
    xlarge: {
      ['font-size']: 'var(--fnt-xl)',
      height: '5.6rem'
    },
    large: {
      ['font-size']: 'var(--fnt-l)',
      height: '4.2rem'
    },
    default: {
      ['font-size']: 'var(--fnt-d)',
      height: '4.2rem'
    },
    small: {
      ['font-size']: 'var(--fnt-s)',
      height: '3.6rem'
    },
    xsmall: {
      ['font-size']: 'var(--fnt-xs)',
      height: '3.6rem'
    }
  }

  $: buttonStylesObject = {
    ['background-color']: outline ? 'transparent' : backgroundColor,
    ['--hover-color']: hoverColor ? hoverColor : null,
    ['border-color']: outline ? outlineBorderColor || backgroundColor : null,
    display: inline ? 'inline-flex' : 'flex',
    width: fill ? '100%' : 'auto',
    ['flex-grow']: fill ? '1' : 'auto',
    ['flex-basis']: fill ? '100%' : 'auto',
    height: sizes[size]['height']
  }
  $: buttonStyleString = makeStyles(buttonStylesObject)

  $: textStylesObject = {
    color: outline ? outlineTextColor || textColor : textColor,
    'font-size': sizes[size]['font-size']
  }
  $: textStyleString = makeStyles(textStylesObject)

  function handleClick() {
    dispatch('click')
  }

  // style action
  function styleAction(node: HTMLInputElement) {
    node.type = type
  }
</script>

<button
  on:click={handleClick}
  class:outline
  class:buttonClasses
  style={buttonStyleString}
  {type}
>
  <span>
    <span class:textClasses style={textStyleString}>{text}</span>
    {#if loading !== null}
      <span
        class="loader-wrapper button-text"
        style="display: inline-block; width: {sizes[size][
          'font-size'
        ]}; height: {sizes[size]['font-size']};"
      >
        <img
          src={logo}
          alt="logo loader"
          style="width: 100%; height: 100%; object-fit: contain;"
        />
      </span>
    {/if}
  </span>
</button>

<style>
  button {
    all: unset;
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
    font-weight: 700;
    font-size: var(--fnt-d);
    color: var(--text-color);
    flex-shrink: 0;
    text-transform: uppercase;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border: 2px solid transparent;
  }
</style>

<script type="text/typescript">
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher() // event handling
  import Button from './Button.svelte'

  export let preset: string = 'primary'
  export let outline: boolean = false
  export let size: string = 'default'
  export let inline: boolean = false
  export let fill: boolean = false
  export let loading: boolean = null

  function handleClick() {
    dispatch('click')
  }

  $: buttonProps = {
    size,
    outline,
    inline,
    fill,
    loading,
    ...buttonDefs[preset]
  }

  interface TButtonDef {
    backgroundColor: string
    textColor: string
    outlineBorderColor?: string
    outlineTextColor?: string
  }

  interface TButtonDefs {
    [key: string]: TButtonDef
  }

  // Nanite Button Definitions
  const buttonDefs: TButtonDefs = {
    primary: {
      backgroundColor: 'var(--col-nanite-1)',
      textColor: 'var(--col-light)',
      outlineTextColor: 'var(--col-nanite-1)'
    },
    secondary: {
      backgroundColor: 'var(--col-nanite-2)',
      textColor: 'var(--col-light)',
      outlineTextColor: 'var(--col-nanite-2)'
    },
    action: {
      backgroundColor: 'var(--col-nanite-3)',
      textColor: 'var(--col-light)',
      outlineTextColor: 'var(--col-nanite-3)'
    },
    alternate: {
      backgroundColor: 'var(--col-nanite-4)',
      textColor: 'var(--col-dark)'
    }
  }
</script>

<Button on:click={handleClick} {...buttonProps} />

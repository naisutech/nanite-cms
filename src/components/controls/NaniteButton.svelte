<script type="text/typescript">
  import Button from './Button.svelte'

  export let preset: string = 'primary'
  export let outline: boolean = false
  export let size: string = 'default'
  export let fill: boolean = false
  export let loading: string = null
  export let type: string = 'button'
  export let text: string = 'Touch me'
  export let disabled: boolean = false

  $: buttonProps = {
    size,
    outline,
    fill,
    loading,
    type,
    text,
    disabled,
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

<Button on:click {...buttonProps} />

<script type="text/typescript">
  import { nanoid } from 'nanoid'
  import hjs from 'highlight.js'
  import { onMount } from 'svelte'
  import { makeStyles } from '../../lib/Utils'
  export let content: string = ''
  export let language: string = 'javascript'
  export let name: string = null
  export let size: string = 'default'

  // internal state
  const sizes = {
    xlarge: {
      '--font-size': 'var(--fnt-xl)'
    },
    large: {
      '--font-size': 'var(--fnt-l)'
    },
    default: {
      '--font-size': 'var(--fnt-d)'
    },
    small: {
      '--font-size': 'var(--fnt-s)'
    },
    xsmall: {
      '--font-size': 'var(--fnt-xs)'
    }
  }
  let topLevelStyles = ''
  $: topLevelStyles = makeStyles({
    ...sizes[size]
  })
  const id = name ? name : nanoid()
  let element: HTMLElement = null
  let renderedCode = null

  onMount(async () => {
    renderedCode = hjs.highlight(content, { language })
  })

  function handleUpdate({ currentTarget }: { currentTarget: HTMLElement }) {
    const currentSelection = getSelection()
    renderedCode = hjs.highlight(currentTarget.textContent, { language })
  }
</script>

<pre
  {id}
  name={id}
  class="codearea"
  style={topLevelStyles}>
  <code bind:this={element} on:input={handleUpdate} contenteditable="true">{@html renderedCode && renderedCode.value}</code>
</pre>

<style>
  pre.codearea {
    display: flex;
    flex-direction: column;
    background-color: var(--col-nanite-5);
    padding: 1.8rem;
  }

  pre.codearea code {
    display: block;
    flex: 1;
  }

  pre.codearea,
  pre.codearea code,
  pre.codearea code * {
    font-size: var(--font-size);
  }
</style>

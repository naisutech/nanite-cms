<script type="text/typescript">
  export let type: string = "button";
  export let text: string = "Touch me";
  export let outline: boolean = false;
  export let backgroundColor: string = "var(--col-nanite-1)";
  export let textColor: string = "var(--col-nanite-5)";
  export let buttonClasses: string = null;
  export let textClasses: string = null;
  export let fill: boolean = false;
</script>

<button
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
  }

  button span {
    color: var(--text-color);
  }
</style>

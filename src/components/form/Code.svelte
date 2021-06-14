<script type="text/typescript">
  export let content: string = null;
  export let name: string = null;
</script>

<pre
  {name}
  class="codearea">
  <code contenteditable="true">{content}</code>
</pre>

<style>
  .codearea {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
  }

  .codearea code {
    display: block;
    flex: 1;
    line-height: 1.2;
  }
</style>

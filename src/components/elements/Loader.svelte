<script>
  import { fade, slide, draw } from 'svelte/transition'
  import { sineOut } from 'svelte/easing'
  import { onMount } from 'svelte'
  let visible = false
  export let color = '#f83e5d'
  export let size = '100px'

  onMount(() => {
    visible = true
  })

  function spinIn(node, { duration, delay }) {
    return {
      css: (t) => {
        const o = sineOut(t)
        let angle = 90 * (1 - t)
        return `transform: rotateY(${angle}deg); opacity: ${o};`
      },
      duration,
      delay
    }
  }

  function spinOut(node, { duration, delay }) {
    return {
      css: (t) => {
        const o = sineOut(t)
        let angle = 90 * (1 - t)
        return `transform: rotateY(${angle}deg); opacity: ${o};`
      },
      duration,
      delay
    }
  }
</script>

<div class="wrapper" style="--size: {size}; --color: {color}">
  {#if visible}
    <svg
      width="192"
      height="192"
      viewBox="0 0 192 192"
      in:spinIn={{ duration: 750 }}
      out:spinOut={{ duration: 800, delay: 1500 }}
      on:outroend={() => {
        visible = true
      }}
    >
      <g
        id="LogoPrimary"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="logo_">
          <path
            d="M96.5,11.6188022 L169.143248,53.5594011 L169.143248,137.440599 L96.5,179.381198 L23.8567518,137.440599 L23.8567518,53.5594011 L96.5,11.6188022 Z"
            id="container"
            stroke="#F83E5D"
            stroke-width="8"
            stroke-linecap="round"
            in:draw={{ duration: 500, delay: 300 }}
          />
          <rect
            id="top_fixture"
            fill="#F83E5D"
            x="83"
            y="16"
            width="27"
            height="18"
            in:slide={{ duration: 300, delay: 800 }}
            out:slide={{ duration: 300, delay: 1500 }}
          />
          <rect
            id="pivot"
            fill="#F83E5D"
            fill-rule="nonzero"
            x="83"
            y="37"
            width="27"
            height="5"
            in:slide={{ duration: 300, delay: 1100 }}
            out:slide={{ duration: 300, delay: 1200 }}
          />
          <path
            d="M96.4982239,89.9073578 C108.375768,89.9073578 118,98.8684839 118,79.7033359 C118,60.538188 108.373399,45 96.4982239,45 C84.6266007,45 75,60.5370513 75,79.7016309 C75,98.8684838 84.6266005,89.9073578 96.4982239,89.9073578 Z"
            id="mount"
            fill="#F83E5D"
            fill-rule="nonzero"
            in:fade={{ duration: 300, delay: 1400 }}
            out:fade={{ duration: 300, delay: 900 }}
          />
          <g
            id="left_claw"
            transform="translate(55 92)"
            fill="#F83E5D"
            fill-rule="nonzero"
            in:slide={{ duration: 300, delay: 1700 }}
            out:slide={{ duration: 300, delay: 600 }}
          >
            <circle id="Oval" cx="20.5" cy="3.5" r="3.5" />
            <polygon
              id="Path"
              points="4.63868909 29.0225076 20 9.70807524 16.3114464 7 5.32907052e-15 27.5127358 2.24036304 54"
            />
          </g>
          <g
            id="center_claw"
            transform="translate(93 92)"
            fill="#F83E5D"
            fill-rule="nonzero"
            in:slide={{ duration: 300, delay: 2000 }}
            out:slide={{ duration: 300, delay: 300 }}
          >
            <circle id="Oval" cx="3.5" cy="3.5" r="3.5" />
            <polygon id="Path" points="3.55527316 77 6 10 1 10" />
          </g>
          <g
            id="right_claw"
            transform="translate(114 92)"
            fill="#F83E5D"
            fill-rule="nonzero"
            in:slide={{ duration: 300, delay: 2300 }}
            out:slide={{ duration: 300 }}
            on:introend={() => (visible = false)}
          >
            <circle id="Oval" cx="3.5" cy="3.5" r="3.5" />
            <polygon
              id="Path"
              points="20.3613109 29.0225076 22.7578688 54 25 27.515001 8.68855352 7 5 9.70807524"
            />
          </g>
          <rect
            id="viewbox"
            stroke-opacity="0"
            stroke="#FFF"
            x="0.5"
            y="0.5"
            width="191"
            height="191"
          />
        </g>
      </g>
    </svg>
  {/if}
</div>

<style>
  .wrapper {
    display: inline-block;
    height: var(--size);
    width: var(--size);
  }

  .wrapper svg {
    transform-style: preserve-3d;
    height: 100%;
    width: 100%;
  }

  .wrapper svg #container {
    stroke: var(--color);
  }
  .wrapper svg #top_fixture,
  .wrapper svg #pivot,
  .wrapper svg #mount,
  .wrapper svg #left_claw,
  .wrapper svg #center_claw,
  .wrapper svg #right_claw {
    fill: var(--color);
  }
</style>

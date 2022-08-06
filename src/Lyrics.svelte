<script lang="ts">
  import { tick } from "svelte";

  import type { Section } from "./lib/parse";

  const fontSizes = {
    1: "1em",
    2: "1.2em",
    3: "1.5em",
    4: "2.5em",
    5: "3.5em",
  };

  export let fontSize = 3;
  export let showChords = true;
  export let lyrics: Section[] = [];

  let sectionPtr = 0;
  let container;

  const updateScroll = async () => {
    if (!container) {
      return;
    }

    await tick();

    const currentSection = container.querySelector(".active");

    if (currentSection) {
      currentSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  $: updateScroll(), [sectionPtr];
  $: updateScroll(), [fontSize];

  const handleKeydown = (e: KeyboardEvent) => {
    const el = e.target;
    if (el instanceof Element) {
      if (e.key === "Home") {
        sectionPtr = 0;
      }
      if (e.key === "ArrowDown") {
        sectionPtr = (sectionPtr + 1 + lyrics.length) % lyrics.length;
      } else if (e.key === "ArrowUp") {
        sectionPtr = (sectionPtr - 1 + lyrics.length) % lyrics.length;
      }
    }
  };
</script>

<div
  bind:this={container}
  id="lyrics"
  tabindex="0"
  style={`font-size: ${fontSizes[fontSize]}`}
  on:keydown={handleKeydown}
>
  <div class="filler" />
  {#each Object.entries(lyrics) as [id, section]}
    <div class="section" class:active={Number(id) === sectionPtr}>
      {#if section.title !== undefined}
        <h3 class="title">[{section.title}]</h3>
      {/if}

      {#if section.lines}
        {#each Object.entries(section.lines) as [lineId, line]}
          {#if showChords && line.chords !== undefined}
            <pre class="chords">{line.chords}</pre>
          {/if}

          {#if line.lyrics !== undefined}
            <p class="lyrics">{line.lyrics}</p>
          {/if}
        {/each}
      {/if}
    </div>
  {/each}
  <div class="filler" />
  <footer tabindex="0" on:focus={() => document.getElementById("sidebar").focus()} />
</div>

<style>
  #lyrics {
    background-color: rgb(238, 238, 238);
    display: grid;
    gap: 1em;
    overflow-y: hidden;
    padding: 2rem;
    scroll-behavior: smooth;
    transition: font-size 200ms ease-in-out;
  }

  #lyrics:focus {
    outline: none;
  }

  #lyrics:not(:focus) {
    background-color: #0003;
    opacity: 0.9;
  }

  .filler {
    height: 50vh;
  }

  .section {
    opacity: 0.5;
  }

  .section.active {
    opacity: 1;
    position: relative;
  }

  .section.active:after {
    content: "▶";
    color: red;
    position: absolute;
    top: calc(50% - 0.2em);
    transform: translate(-1em, 0em);
  }

  .title {
    line-height: 2em;
    margin: 0 0 1em;
    font-weight: 400;
  }

  .chords {
    margin: -0.7em 0 0 0;
    font-size: 0.8em;
  }

  .lyrics {
    margin: 0 0 1.2em;
  }
</style>

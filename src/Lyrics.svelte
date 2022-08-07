<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";

  import type { Section } from "./lib/parse";
  import LyricLine from "./LyricLine.svelte";

  const fontSizes = {
    1: 0.75,
    2: 0.85,
    3: 1.0,
    4: 1.5,
    5: 2.0,
  };
  export let fontSize = 3;
  export let showChords = true;
  export let lyrics: Section[] = [];

  const zoomSpeed = 200;
  let container: Element;
  let sectionPtr = 0;
  let dispatch = createEventDispatcher();

  const scrollToActive = async () => {
    if (!container) return;

    await tick();
    const currentSection = container.querySelector(".active");

    if (currentSection) {
      currentSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const delayedScroll = async (timeout) => setTimeout(scrollToActive, timeout);

  $: scrollToActive(), [sectionPtr];
  $: delayedScroll(zoomSpeed), [fontSize];

  const keyBinds: Record<string, () => void> = {
    Home: () => (sectionPtr = 0),
    ArrowDown: () => (sectionPtr = (sectionPtr + 1 + lyrics.length) % lyrics.length),
    ArrowUp: () => (sectionPtr = (sectionPtr - 1 + lyrics.length) % lyrics.length),
    NumpadPlus: () => dispatch("fontsize", (fontSize + 1) % 5),
  };

  const handleKeydown = (e: KeyboardEvent) => keyBinds[e.key]?.();
</script>

<div
  bind:this={container}
  id="lyrics"
  tabindex="0"
  style:--fontSize={fontSizes[fontSize]}
  style:--zoomspeed={zoomSpeed}
  on:keydown={handleKeydown}
>
  <div class="filler" />
  {#each Object.entries(lyrics) as [id, section] (id)}
    <div
      class="section"
      class:active={Number(id) === sectionPtr}
      on:click={() => (sectionPtr = Number(id))}
    >
      {#if section.title !== undefined}
        <h3 class="title">[{section.title}]</h3>
      {/if}

      {#if section.lines}
        {#each section.lines as line}
          <LyricLine {showChords} {line} />
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
    cursor: default;
    display: grid;
    font-size: calc(var(--fontSize) * 1.5vw);
    gap: 1em;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 2rem;
    scroll-behavior: smooth;
    transition: font-size calc(var(--zoomspeed) * 1ms) linear;
  }

  #lyrics:focus {
    outline: none;
  }

  #lyrics:not(:focus) {
    /* background-color: #0003; */
    opacity: 1.0;
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

  #lyrics:focus .section.active:after {
    color: red;
    content: "▶";
    position: absolute;
    top: calc(50% - 0.2em);
    transform: translate(-1em, 0em);
  }

  .title {
    line-height: 2em;
    margin: 0 0 1em;
    font-weight: 400;
  }
</style>

<script lang="ts">
  const fontSizes = {
    1: "1em",
    2: "1.2em",
    3: "1.5em",
    4: "2.5em",
    5: "3.5em",
  };

  export let fontSize = 3;
  export let showChords = true;
  export let lyrics = [];
  let sectionPtr = 0;

  const handleKeydown = (e: KeyboardEvent) => {
    const el = e.target;
    if (el instanceof Element) {
      if (e.key === "ArrowDown") {
        sectionPtr = (sectionPtr + 1 + lyrics.length) % lyrics.length;
      } else if (e.key === "ArrowUp") {
        sectionPtr = (sectionPtr - 1 + lyrics.length) % lyrics.length;
      }

      window.setTimeout(() => {
        const currentSection = el.querySelector(".active");
        if (currentSection) {
          currentSection.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });
    }
  };
</script>

<div
  id="lyrics"
  tabindex="0"
  style={`font-size: ${fontSizes[fontSize]}`}
  on:keydown={handleKeydown}
>
  <div class="filler" />
  {#each Object.entries(lyrics) as [id, lyric]}
    <div class="section" class:active={Number(id) === sectionPtr}>
      {#if lyric.title !== undefined}
        <h3 class="title">[{lyric.title}]</h3>
      {/if}

      {#if showChords && lyric.chords !== undefined}
        <pre class="chords">{lyric.chords}</pre>
      {/if}

      {#if lyric.lyrics !== undefined}
        <p class="lyrics">{lyric.lyrics}</p>
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

  .title {
    white-space: pre;
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
    top: 50%;
    transform: translate(-1em, 0em);
  }

  .chords {
    margin: -0.7em 0 0 0;
  }
</style>

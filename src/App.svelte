<script lang="ts">
  import "@fontsource/roboto-serif/variable-full.css";
  import { onMount } from "svelte";
  import { element } from "svelte/internal";
  import testLyric from "./data/doin-your-mom.txt?raw";
  import parse from "./lib/parse";
  import Sidebar from "./Sidebar.svelte";

  const lyrics = parse(testLyric);
  const fontSizes = {
    1: "1em",
    2: "1.2em",
    3: "1.5em",
    4: "2.5em",
    5: "3.5em",
  };
  let fontSize = 1;

  const el = ["lyrics", "capo", "chords", "fontsize"];
  let sel = 0;
  let capo = 0;
  let show_chords = true;
  let font = 3;

  function nextSelection() {
    document.getElementById(`${el[sel]}-pointer`).classList.remove("pactive");
    sel = (sel + 1) % el.length;
    document.getElementById(`${el[sel]}-pointer`).classList.add("pactive");
  }

  onMount(() => {
    function keylistener(event) {
      // i stole this from stackoverflow
      event = event || window.event;
      let key = event.key || event.which || event.key;

      // check the key pressed and whether there is something to scroll
      if (key == "ArrowDown" || key == "j") {
        event.preventDefault();
        switch (el[sel]) {
          case "lyrics":
            if (active != elements.length - 1) scroll("down");
            break;
          case "capo":
            capochange("down");
            break;
          case "chords":
            chords();
            break;
          case "fontsize":
            fontchange("down");
            break;
        }
      }
      if (key == "ArrowUp" || key == "k") {
        event.preventDefault();
        switch (el[sel]) {
          case "lyrics":
            if (active != 0) scroll("up");
            break;
          case "capo":
            capochange("up");
            break;
          case "chords":
            chords();
            break;
          case "fontsize":
            fontchange("up");
            break;
        }
      }
      if (key == "l") {
        event.preventDefault();
        nextSelection();
      }
    }

    document.getElementById("capo-number").innerText = `${capo}`;

    async function fontchange(dir) {}

    async function capochange(dir) {
      if (dir == "up") {
        capo = (capo + 1) % 13;
      } else {
        capo = (capo - 1) % 13;
        if (capo < 0) {
          capo = 12;
        }
      }
      document.getElementById("capo-number").innerText = `${capo}`;
    }

    async function chords() {
      console.log(show_chords);
      if (show_chords) {
        document.getElementById("chords-on").classList.remove("selected");
        document.getElementById("chords-off").classList.add("selected");
        show_chords = false;
      } else {
        document.getElementById("chords-off").classList.remove("selected");
        document.getElementById("chords-on").classList.add("selected");
        show_chords = true;
      }
    }

    let elements = document.getElementById("lyrics").children;
    // this tracks how far along we are in the song.
    // you would probably want to replace this with a svelte store
    let active = 0;

    async function scroll(direction) {
      if (direction == "up") {
        active--;

        let oldelement = elements[active + 1];
        if (oldelement) {
          oldelement.classList.remove("active");
        }
      } else if (direction == "down") {
        active++;

        let oldelement = elements[active - 1];
        if (oldelement) {
          oldelement.classList.remove("active");
        }
      }

      let element = elements[active];
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        element.classList.add("active");
      }
    }

    window.addEventListener("keydown", keylistener);

    scroll("up");
  });
</script>

<Sidebar id="sidebar" tabIndex="0" {fontSize} on:fontsize={(e) => (fontSize = e.detail)} />

<div id="lyrics" tabindex="0" style={`font-size: ${fontSizes[fontSize]}`}>
  {#each Object.entries(lyrics) as [_, lyric]}
    {#if lyric.section !== undefined}
      <p class="section">[{lyric.section}]</p>
    {/if}

    {#if lyric.chords !== undefined}
      <pre class="chords">{lyric.chords}</pre>
    {/if}

    {#if lyric.lyrics !== undefined}
      <h3 class="lyrics">{lyric.lyrics}</h3>
    {/if}
  {/each}
  <footer tabindex="0" on:focus={() => document.getElementById("sidebar").focus()} />
</div>

<style>
  #lyrics {
    background-color: rgb(238, 238, 238);
    padding: 2rem;
    overflow-y: hidden;
  }

  #lyrics:focus {
    content: "▶";
  }

  #lyrics:not(:focus) {
    background-color: #0005;
    opacity: 0.8;
  }

  .section {
    white-space: pre;
  }

  .verse {
    opacity: 0.5;
  }
  .verse.active {
  }
</style>

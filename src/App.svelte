<script>
  import "@fontsource/roboto-serif/variable-full.css";
  import { onMount } from "svelte";
  import { each } from "svelte/internal";
  import testLyric from "./data/doin-your-mom.txt?raw";
  import parse from "./lib/parse";

  const lyrics = parse(testLyric);

  const el = ["lyrics", "capo", "chords", "fontsize"];
  let sel = 0;
  let capo = 0;
  let show_chords = true;
  let font = 3;
  const fz = [1, 1.2, 1.5, 2.5, 3.5];
  const sz = ["smallest", "small", "normal", "large", "largest"];

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
    document.getElementById("lyrics").style.fontSize = `${fz[font]}em`;

    async function fontchange(dir) {
      document.getElementById(`font-${sz[font]}`).classList.remove("selected");
      if (dir == "up") {
        font = (font + 1) % fz.length;
      } else {
        font = (font - 1 + fz.length) % fz.length;
      }
      document.getElementById(`font-${sz[font]}`).classList.add("selected");
      document.getElementById("lyrics").style.fontSize = `${fz[font]}em`;
    }

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

    let elements = document.getElementById("doin").children;
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

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      element.classList.add("active");
    }

    window.addEventListener("keydown", keylistener);

    scroll();
  });
</script>

<div id="sidebar">
  <div class="sidebar-header">
    <div class="pointer sidebar-pointer" id="capo-pointer">▶</div>
    <div class="sidebar-header-text">CAPO</div>
  </div>
  <div id="capo-number">1</div>
  <div class="sidebar-header">
    <div class="pointer sidebar-pointer" id="chords-pointer">▶</div>
    <div class="sidebar-header-text">CHORDS</div>
  </div>
  <div class="on-off">
    <div class="on sidebar-select selected" id="chords-on">ON</div>
    <div class="off sidebar-select" id="chords-off">OFF</div>
  </div>
  <div class="sidebar-header">
    <div class="pointer sidebar-pointer" id="fontsize-pointer">▶</div>
    <div class="sidebar-header-text">FONT SIZE</div>
  </div>
  <div class="aaaaa">
    <div class="smallest sidebar-select" id="font-smallest">A</div>
    <div class="small sidebar-select" id="font-small">A</div>
    <div class="normal sidebar-select" id="font-normal">A</div>
    <div class="large sidebar-select selected" id="font-large">A</div>
    <div class="largest sidebar-select" id="font-largest">A</div>
  </div>
</div>
<div class="pointer pactive" id="lyrics-pointer">▶</div>
<div id="lyrics">
  <div class="ignore" height="600px" />
  <div id="doin">
    {#each Object.entries(lyrics) as [_, lyric]}
      <div class="verse">
        {#if lyric.section !== undefined}
          <pre class="section">[{lyric.section}]</pre>
        {/if}

        {#if lyric.chords !== undefined}
          <pre class="chords">{lyric.chords}</pre>
        {/if}

        {#if lyric.lyrics !== undefined}
          <pre class="lyrics">{lyric.lyrics}</pre>
        {/if}
      </div>
    {/each}
  </div>
  <div class="ignore" />
</div>

<style>
  .section {
    white-space: pre;
  }

  .verse {
    opacity: 0.5;
    @apply ease-in-out transition-all duration-150 opacity-50;
  }
  .verse.active {
    @apply opacity-100;
  }
</style>

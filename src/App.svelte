<script lang="ts">
  import { onMount } from "svelte";
  import testLyric from "./data/testlyrics2.txt?raw";
  import parse from "./lib/parse";
  import Lyrics from "./Lyrics.svelte";
  import Sidebar from "./Sidebar.svelte";

  const lyrics = parse(testLyric);

  let fontSize = 3;

  const el = ["lyrics", "capo", "chords"];
  let sel = 0;
  let capo = 0;
  let showChords = true;

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
          case "capo":
            capochange("down");
            break;
        }
      }
      if (key == "ArrowUp" || key == "k") {
        event.preventDefault();
        switch (el[sel]) {
          case "capo":
            capochange("up");
            break;
        }
      }
      if (key == "l") {
        event.preventDefault();
        nextSelection();
      }
    }

    document.getElementById("capo-number").innerText = `${capo}`;

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

    window.addEventListener("keydown", keylistener);
  });
</script>

<Sidebar
  id="sidebar"
  tabIndex="0"
  {showChords}
  on:chords={(e) => (showChords = e.detail)}
  {fontSize}
  on:fontsize={(e) => (fontSize = e.detail)}
/>
<Lyrics {fontSize} {lyrics} {showChords} />

<style>
</style>

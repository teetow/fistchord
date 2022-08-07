<script lang="ts">
  import { onMount } from "svelte";
  import testLyric from "./data/testlyrics4.txt?raw";
  import parse from "./lib/parse";
  import Lyrics from "./Lyrics.svelte";
  import Sidebar from "./Sidebar.svelte";

  const lyrics = parse(testLyric);

  let fontSize = 3;

  let sel = 0;
  let transpose = 0;
  let showChords = true;
</script>

<Sidebar
  id="sidebar"
  tabIndex="0"
  {transpose}
  on:transpose={(e) => (transpose = e.detail)}
  {showChords}
  on:chords={(e) => (showChords = e.detail)}
  {fontSize}
  on:fontsize={(e) => (fontSize = e.detail)}
/>
<Lyrics {transpose} {fontSize} {showChords} {lyrics} />

<style>
</style>

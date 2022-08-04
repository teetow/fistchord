<script>
  import { createEventDispatcher } from "svelte";
  import Select from "./Select.svelte";

  export let id = "";
  export let tabIndex;
  export let fontSize = 1;
  export let showChords = true;

  const fontSizes = {
    1: "1em",
    2: "1.2em",
    3: "1.5em",
    4: "2.5em",
    5: "3.5em",
  };

  const fontOptions = [1, 2, 3, 4, 5].map((num) => ({
    id: `font-${num}`,
    value: num,
    label: "A",
    style: { fontSize: fontSizes[num] },
  }));

  const dispatch = createEventDispatcher();
</script>

<div {id} {tabIndex} class="sidebar" on:focus={() => document.getElementById("chords").focus()}>
  <div class="section">
    <h2 class="header">CAPO</h2>
    <div id="capo-number">1</div>
  </div>

  <div class="section">
    <h2 class="header">CHORDS</h2>
    <Select
      id="chords"
      options={[
        {
          id: "chords-true",
          value: true,
          label: "ON",
        },
        {
          id: "chords-false",
          value: false,
          label: "OFF",
        },
      ]}
      value={showChords}
      on:change={(e) => (showChords = e.detail)}
    />
  </div>

  <div class="section">
    <h2 class="header">FONT SIZE</h2>
  </div>
  <Select
    options={fontOptions}
    value={fontSize}
    on:change={(e) => dispatch("fontsize", e.detail)}
  />
</div>

<style>
  .sidebar {
    align-content: flex-start;
    background-color: #222;
    color: rgb(240, 240, 240);
    display: grid;
    gap: 4rem;
    padding-top: 4rem;
  }

  .section {
    display: grid;
    place-items: center;
    gap: 2rem;
  }

  .header {
    font-size: 2.3em;
    font-weight: bold;
    color: rgb(240, 240, 240);
  }

  #capo-number {
    font-size: 6em;
    line-height: 0.8em;
    font-weight: bold;
    color: rgb(240, 240, 240);
  }
</style>

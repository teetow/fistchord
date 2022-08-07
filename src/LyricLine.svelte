<script lang="ts">
  import type { Line } from "./lib/parse";

  export let line: Line;
  export let showChords = false;
  export let chordStyle: "solid" | "outline" = "outline";

  type Fragment = {
    lyric?: string;
    chord?: string;
  };

  type ChordWithOffset = {
    symbol: string;
    offset: number;
  };

  const getChordPos = (line: string): ChordWithOffset[] => {
    if (line === undefined || line.trim() == "") return [];
    const chords = line.split(/(?<gap>\s+)/).reduce(
      (acc, val) => {
        if (val.trim() == "") {
          return { ...acc, offset: acc.offset + val.length };
        } else {
          return {
            ...acc,
            offset: acc.offset + val.length,
            chords: [
              ...acc.chords,
              {
                offset: acc.offset,
                symbol: val,
              },
            ],
          };
        }
      },
      {
        offset: 0,
        chords: [] as ChordWithOffset[],
      }
    );

    return chords.chords;
  };

  const applyChords = (line: string, chords: ChordWithOffset[]): Fragment[] => {
    let lastLyric = "";
    const splits = chords.map((c) => c.offset);
    console.log(splits, chords);

    const out = line.split("").reduce((acc, val, pos) => {
      if (splits.includes(pos) || pos === line.length - 1) {
        const chord = chords.find((c) => c.offset === pos)?.symbol;
        const lyric = `${lastLyric}${val}`;
        lastLyric = "";

        return [...acc, { lyric, chord }];
      }

      lastLyric += val;
      return [...acc];
    }, []) as Fragment[];
    return [
      ...out,
      ...chords.filter((c) => c.offset >= line.length).map((c) => ({ chord: c.symbol })),
    ];
  };
</script>

<p class="lyrics" class:show-chords={showChords}>
  {#if line.chords}
    {#each applyChords(line.lyrics, getChordPos(line.chords)) as fragment}
      {#if fragment.lyric}<span class="lyricfragment">{fragment.lyric}</span
        >{/if}{#if fragment.chord}<span
          class="chord"
          class:solid={chordStyle === "solid"}
          class:outline={chordStyle === "outline"}
          data-chord={fragment.chord}
        />{/if}
    {/each}
  {:else}
    <span class="lyricfragment">{line.lyrics}</span>
  {/if}
</p>

<style>
  .lyricfragment {
    line-height: 2em;
  }

  .lyrics:not(.show-chords) .chord {
    display: none;
  }

  .chord {
    display: inline-block;
    width: 0;
    overflow: visible;
    color: white;
  }

  .chord.solid:before {
    content: attr(data-chord);
    display: inline-block;
    border-radius: 2px;
    background-color: #222;
    padding: 0.05em 0.35em;
    transform: translate(-1em, -1.8em);
    font-size: 0.8em;
  }

  .chord.outline:before {
    border-radius: 3px;
    border: 2px solid #222;
    color: #222;
    content: attr(data-chord);
    display: inline-block;
    font-size: 0.8em;
    font-weight: 600;
    line-height: 0.8em;
    padding: 0.2em 0.2em;
    transform: translate(-1em, -1.8em);
  }

  .lyrics {
    margin: 0 0 1.2em;
  }
</style>

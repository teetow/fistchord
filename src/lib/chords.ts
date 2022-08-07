const chordRe =
  /^(N\.?C\.?)|(?:\s*(?<note>(?:[CDEFGAB])(?:#{1,2}|b{1,2})?)(?<symbol>(?:m?)?(?:maj7?|min7?|sus2?|7?|5?|add9?)?\s*))+$/;
const notes = ["C", "C#", "D", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export type Chord = {
  note: keyof typeof notes;
  chord: string;
};

export const isChord = (word: string) => {
  return chordRe.test(word);
};

export const hasChords = (line: string) => {
  const words = line?.split(" ").filter((s) => s.trim() !== "");
  return words.filter((s) => isChord(s)).length / words.length > 0.8;
};

export const transposeChord = (chord: string, delta: number) => {
  const rslt = chordRe.exec(chord);
  const {
    groups: { note, symbol },
  } = chordRe.exec(chord);

  const noteIndex = notes.indexOf(note);
  const transposedIndex = (noteIndex + notes.length + delta) % notes.length;

  const out = `${notes[transposedIndex]}${symbol}`;

  return out;
};

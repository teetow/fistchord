const chordRe =
  /^(N\.?C\.?)|(?:\s*[CDEFGAB](?:#{1,2}|b{1,2})?(?:m?)?(?:maj7?|min7?|sus2?|7?|5?|add9?)?\s*)+$/;
const notes = ["C", "C#", "D", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const isChord = (word: string) => {
  return chordRe.test(word);
};

export const hasChords = (line: string) => {
  const words = line?.split(" ");
  return words.length / words.filter((s) => isChord(s)).length < 0.8;
};

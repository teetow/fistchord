import { hasChords } from "./chords";
import { Linereader } from "./linereader";

const sectionRe = /\[(?<title>.+)\]/;

const isSection = (s: string) => sectionRe.test(s);

const getSectionTitle = (s: string) => {
  const {
    groups: { title },
  } = sectionRe.exec(s) as unknown as SectionMatch;
  return title;
};

type SectionMatch = {
  groups: {
    title: string;
  };
};

type Line = {
  chords?: string;
  lyrics?: string;
};

export type Section = {
  title?: string;
  lines?: Line[];
};

const parse = (data: string) => {
  const rawLines = data
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l !== "");

  const r = new Linereader(rawLines);

  const sections: Section[] = [];

  while (!r.eof) {
    const section: Section = {};

    if (isSection(r.nextLine)) {
      section.title = getSectionTitle(r.readLine());
      if (isSection(r.nextLine)) {
        sections.push(section);
        continue;
      }
    }

    let stanzaCtr = 0;
    while (stanzaCtr < 4 && !isSection(r.nextLine) && !r.eof) {
      const line: Line = {};

      const text = r.readLine();

      if (hasChords(text)) {
        line.chords = text;
        line.lyrics = !hasChords(r.nextLine) && !isSection(r.nextLine) ? r.readLine() : "";
      } else {
        line.lyrics = text;
      }
      section.lines = [...(section.lines || []), line];
      stanzaCtr++;
    }
    sections.push(section);
  }

  return sections;
};

export default parse;

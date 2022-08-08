import { describe, expect, it, test } from "vitest";
import { cleanup } from "./cleanup";

test("returns same if a simple string", async () => expect(cleanup(["hello"])).toEqual(["hello"]));

test("returns same file if not parsable", async () => {
  const notValid = `HELLO
  these are not parsable lyrics`.split("\n");

  expect(cleanup(notValid)).toEqual(notValid);
});

const validSnippet = `[Verse 1]

C           Am          F               G7
Butts butts butts butts butts butts and butts again
`.split("\n");

test("returns lyrics if well-formed lyrics file", async () => {
  expect(cleanup(validSnippet)).toEqual(validSnippet);
});

test("discards crap before first section", () => {
  const data = `crap\ncrap\ncrap\n${validSnippet.join("\n")}`.split("\n");
  expect(cleanup(data)).toEqual(validSnippet);
});

test("discards stuff after ug end markers", () => {
  const data = `crap\ncrap\ncrap\n${validSnippet.join(
    "\n"
  )}\nBy helping UG you make the world better... and earn IQ
  Please rate this tab
`.split("\n");

  expect(cleanup(data)).toEqual(validSnippet);
});

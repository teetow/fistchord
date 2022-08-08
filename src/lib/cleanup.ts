import { Linereader } from "./linereader";

export const cleanup = (paste: string[]) => {
  const r = new Linereader(paste);

  const preamble = r.readUntilTrue((s) => s.indexOf("[") > -1);
  if (preamble) {
    return r.readUntilTrue((s) => s.indexOf("By helping UG") > -1) || r.readAll();
  }

  return paste;
};

import { atom } from "recoil";

const DEFAULT_CHROMA_KEY = "#00ff00";
const DEFUALT_DISPLAY_ID = 0;

export const chromaKeyAtom = atom<string>({
  key: "chromaKeyAtom",
  default: DEFAULT_CHROMA_KEY,
});

export const currentDisplayId = atom<number>({
  key: "currentDisplayId",
  default: DEFUALT_DISPLAY_ID,
});

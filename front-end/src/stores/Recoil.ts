import { atom } from "recoil";
import { Game } from "../AppTypes";

const DEFAULT_CHROMA_KEY = "#00ff00";
const DEFUALT_DISPLAY_ID = 0;
const DEFAULT_GAME: Game = {
  players: [
    {
      coins: 0,
      id: 0,
      items: [],
      name: "",
      rank: 1,
      stars: 0,
    },
    {
      coins: 0,
      id: 0,
      items: [],
      name: "",
      rank: 2,
      stars: 0,
    },
    {
      coins: 0,
      id: 0,
      items: [],
      name: "",
      rank: 3,
      stars: 0,
    },
    {
      coins: 0,
      id: 0,
      items: [],
      name: "",
      rank: 4,
      stars: 0,
    },
  ],
};

export const chromaKeyAtom = atom<string>({
  key: "chromaKeyAtom",
  default: DEFAULT_CHROMA_KEY,
});

export const currentDisplayId = atom<number>({
  key: "currentDisplayId",
  default: DEFUALT_DISPLAY_ID,
});

export const currentGameAtom = atom<Game>({
  key: "currentGameAtom",
  default: DEFAULT_GAME,
});

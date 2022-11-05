import { atom, selectorFamily } from "recoil";
import { Game, Player } from "../AppTypes";

const DEFAULT_CHROMA_KEY = "#e4e4e4";
const DEFUALT_DISPLAY_ID = 0;
const DEFAULT_GAME: Game = {
  players: [
    {
      coins: 0,
      id: 1,
      items: [],
      name: "Player 1",
      rank: 1,
      stars: 0,
    },
    {
      coins: 0,
      id: 2,
      items: [],
      name: "Player 2",
      rank: 2,
      stars: 0,
    },
    {
      coins: 0,
      id: 3,
      items: [],
      name: "Player 3",
      rank: 3,
      stars: 0,
    },
    {
      coins: 0,
      id: 4,
      items: [],
      name: "Player 4",
      rank: 4,
      stars: 0,
    },
  ],
};
const DEFAULT_SOCKET_CONNECTED = false;

export const chromaKeyAtom = atom<string>({
  key: "chromaKeyAtom",
  default: DEFAULT_CHROMA_KEY,
});
export const currentDisplayId = atom<number>({
  key: "currentDisplayId",
  default: DEFUALT_DISPLAY_ID,
});
export const sockedConnectedAtom = atom<boolean>({
  key: "socketConnectedAtom",
  default: DEFAULT_SOCKET_CONNECTED,
});
export const currentGameAtom = atom<Game>({
  key: "currentGameAtom",
  default: DEFAULT_GAME,
});
export const playerSelectorFam = selectorFamily<Player | undefined, number>({
  key: 'playerSelectorFam',
  get: (id: number) => ({ get }) => get(currentGameAtom).players.find((p) => p.id === id)
});
import { atom, atomFamily, DefaultValue, selector, selectorFamily } from "recoil";
import { Game, Player } from "../AppTypes";
import {
  DEFAULT_CHROMA_KEY,
  DEFUALT_DISPLAY_ID,
  DEFAULT_SOCKET_CONNECTED,
  DEFAULT_GAME,
} from "./Constants";

export const isProductionSelector = selector<boolean>({
  key: "isProductionSelector",
  get: () => import.meta.env.PROD,
});
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
  key: "playerSelectorFam",
  get:
    (id: number) =>
    ({ get }) =>
      get(currentGameAtom).players.find((p) => p.id === id),
  set:
    (id: number) =>
    ({ get, set }, newValue) => {
      const player = get(currentGameAtom).players.find((p) => p.id === id);
      const players = get(currentGameAtom).players;
      const index = players.findIndex((p) => p.id === id);
      if (newValue instanceof DefaultValue || !newValue || !player) return;
      set(currentGameAtom, {
        players: [
          ...players.slice(0, index),
          newValue,
          ...players.slice(index + 1),
        ],
      });
    },
});
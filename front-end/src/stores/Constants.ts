import { Game, TestItem } from "../AppTypes";

export const DEFAULT_CHROMA_KEY = "";
export const DEFUALT_DISPLAY_ID = 0;
export const DEFAULT_GAME: Game = {
  players: [
    {
      coins: 0,
      newCoins: 0,
      id: 1,
      items: [TestItem, TestItem, TestItem, TestItem],
      name: "Player 1",
      rank: 1,
      stars: 0,
      avatarUrl: "",
    },
    {
      coins: 0,
      newCoins: 0,
      id: 2,
      items: [TestItem],
      name: "Player 2",
      rank: 2,
      stars: 0,
      avatarUrl: "",
    },
    {
      coins: 0,
      newCoins: 0,
      id: 3,
      items: [TestItem],
      name: "Player 3",
      rank: 3,
      stars: 0,
      avatarUrl: "",
    },
    {
      coins: 0,
      newCoins: 0,
      id: 4,
      items: [TestItem],
      name: "Player 4",
      rank: 4,
      stars: 0,
      avatarUrl: "",
    },
  ],
};
export const DEFAULT_SOCKET_CONNECTED = false;

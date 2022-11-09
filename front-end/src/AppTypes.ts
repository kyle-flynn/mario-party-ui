import CURSED from "./assets/items/Cursed.png";
import CUSTOM from "./assets/items/Custom Dice.png";
import DASH from "./assets/items/Dash.png";
import DOUBLE from "./assets/items/Double Dice.png";
import STAR from "./assets/items/Star.png";
import TRIPLE from "./assets/items/Triple Dice.png";
import WARP from "./assets/items/Warp.png";
import WHISTLE from "./assets/items/Whistle.png";

export interface Game {
  players: Player[];
}

export interface Player {
  id: number;
  name: string;
  stars: number;
  rank: number;
  coins: number;
  newCoins: number;
  avatarUrl?: string;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  avatarUrl: string;
}

export const CursedItem: Item = {
  id: 0,
  name: "Cursed Item",
  avatarUrl: CURSED,
};
export const CustomDice: Item = {
  id: 1,
  name: "Custom Dice",
  avatarUrl: CUSTOM,
};
export const DashItem: Item = {
  id: 1,
  name: "Dash Item",
  avatarUrl: DASH,
};
export const DoubleDice: Item = {
  id: 1,
  name: "Double Dice",
  avatarUrl: DOUBLE,
};
export const StarItem: Item = {
  id: 1,
  name: "Star Item",
  avatarUrl: STAR,
};
export const TripleDice: Item = {
  id: 1,
  name: "Triple Dice",
  avatarUrl: TRIPLE,
};
export const WarpItem: Item = {
  id: 1,
  name: "Warp Item",
  avatarUrl: WARP,
};
export const WhistleItem: Item = {
  id: 1,
  name: "Whistle Item",
  avatarUrl: WHISTLE,
};

export const Items: Item[] = [
  CursedItem,
  DashItem,
  StarItem,
  WarpItem,
  WhistleItem,
  CustomDice,
  DoubleDice,
  TripleDice,
];

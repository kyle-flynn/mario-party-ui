import TEST_ITEM from "./assets/test_item.png";

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

export const TestItem: Item = {
  id: -1,
  name: "Test Item",
  avatarUrl: TEST_ITEM,
};
export const TestItem2: Item = {
  id: -1,
  name: "Test Item 2",
  avatarUrl: TEST_ITEM,
};

export const Items: Item[] = [TestItem, TestItem2];

export interface Game {
  players: Player[];
}

export interface Player {
  id: number;
  name: string;
  stars: number;
  rank: number;
  coins: number;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
}

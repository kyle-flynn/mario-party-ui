export interface Game {
    players: Player[];
}

export interface Player {
    id: number;
    name: string;
    stars: number;
    coins: number;
    items: Item[];
}

export interface Item {
    id: number;
    name: string;
}
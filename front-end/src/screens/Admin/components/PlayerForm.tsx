import { ChangeEvent, FC, MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { playerSelectorFam } from "../../../stores/Recoil";
import classes from "../AdminPanel.module.less";

import STARS_ICON from "../../../assets/star-icon.png";
import COIN_ICON from "../../../assets/coin-icon.png";
import { ItemDropdown } from "./ItemDropdown";
import { Item } from "../../../AppTypes";

interface Props {
  playerId: number;
}

export const PlayerForm: FC<Props> = ({ playerId }) => {
  const [player, setPlayer] = useRecoilState(playerSelectorFam(playerId));

  if (!player) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;
    const typedValue = type === "number" ? parseInt(value) : value;
    setPlayer({ ...player, [name]: typedValue });
  };
  const handleAddItem = (item: Item) => {
    const items = [...player.items, item];
    setPlayer({ ...player, items });
  };
  const handleRemoveItem = (index: number) => {
    const items = [
      ...player.items.slice(0, index),
      ...player.items.slice(index + 1),
    ];
    setPlayer({ ...player, items });
  };

  return (
    <form>
      <h1>Player {player.id} Stats</h1>
      <div className={classes.playerImage}>
        <img src={player.avatarUrl} />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="stars">
          <img src={STARS_ICON} />
          <span>Stars</span>
        </label>
        <input
          name="stars"
          id="stars"
          type="number"
          value={player.stars}
          onChange={handleChange}
        />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="newStars">
          <span>Stars To Add</span>
        </label>
        <input
          name="newStars"
          id="newStars"
          type="number"
          value={player.newStars}
          onChange={handleChange}
        />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="coins">
          <img src={COIN_ICON} />
          <span>Coins</span>
        </label>
        <input
          name="coins"
          id="coins"
          type="number"
          value={player.coins}
          onChange={handleChange}
        />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="newCoins">
          <span>Coins To Add</span>
        </label>
        <input
          name="newCoins"
          id="newCoins"
          type="number"
          value={player.newCoins}
          onChange={handleChange}
        />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          value={player.name}
          onChange={handleChange}
        />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="avatarUrl">Avatar URL</label>
        <input
          name="avatarUrl"
          id="avatarUrl"
          type="text"
          value={player.avatarUrl}
          onChange={handleChange}
        />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="playerAddItem">Items</label>
        <ItemDropdown onSelect={handleAddItem} />
      </div>
      {player.items.map((i, index) => {
        const select = (e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          handleRemoveItem(index);
          console.log("here", index);
        };
        return (
          <div className={classes.formgroup}>
            <label>{i.name}</label>
            <button className={classes.reset} onClick={select}>
              Remove
            </button>
          </div>
        );
      })}
    </form>
  );
};

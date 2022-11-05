import { ChangeEvent, FC, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import { playerSelectorFam } from '../../../stores/Recoil';
import classes from '../AdminPanel.module.less';

import STARS_ICON from '../../../assets/star-icon.png';
import COIN_ICON from '../../../assets/coin-icon.png';

interface Props {
  playerId: number;
  onUpdate: () => void;
}

export const PlayerForm: FC<Props> = ({ playerId, onUpdate }) => {
  const [player, setPlayer] = useRecoilState(playerSelectorFam(playerId));

  if (!player) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;
    const typedValue = type === 'number' ? parseInt(value) : value;
    setPlayer({ ...player, [name]: typedValue });
  };
  const handleCoinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newCoins = parseInt(value);
    const newPlayer = { ...player, newCoins };
    setPlayer({ ...newPlayer });
  };
  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPlayer({ ...player, coins: player.coins + player.newCoins });
    onUpdate();
  };
  return (
    <form>
      <h1>Player {player.id} Stats</h1>
      <div className={classes.playerImage}>
        <img src={player.avatarUrl} />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="stars"><img src={STARS_ICON} /><span>Stars</span></label>
        <input name="stars" id="stars" type="number" value={player.stars} onChange={handleChange} />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="coins"><img src={COIN_ICON} /><span>Coins</span></label>
        <input name="coins" id="coins" type="number" value={player.coins} onChange={handleChange} />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="newCoins"><span>Coins To Add</span></label>
        <input id="newCoins" type="number" value={player.newCoins} onChange={handleCoinChange} />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="name">Name</label>
        <input name="name" id="name" type="text" value={player.name} onChange={handleChange} />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="avatarUrl">Avatar URL</label>
        <input name="avatarUrl" id="avatarUrl" type="text" value={player.avatarUrl} onChange={handleChange} />
      </div>
      <button type="submit" onClick={handleUpdate}>Update</button>
    </form>
  )
};

import { ChangeEvent, FC, MouseEvent } from 'react';
import { Player } from '../../../AppTypes';
import classes from '../AdminPanel.module.less';

import STARS_ICON from '../../../assets/star-icon.png';
import COIN_ICON from '../../../assets/coin-icon.png';
import { useRecoilValue } from 'recoil';
import { playerSelectorFam } from '../../../stores/Recoil';

interface Props {
  playerId: number;
  onChange: (player: Player) => void;
}

export const PlayerForm: FC<Props> = ({ playerId, onChange }) => {
  const player = useRecoilValue(playerSelectorFam(playerId));

  if (!player) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;
    const typedValue = type === 'number' ? parseInt(value) : value;
    onChange({ ...player, [name]: typedValue });
  };
  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <form>
      <h1>Player {player.id} Stats</h1>
      <div className={classes.formgroup}>
        <label htmlFor="stars"><img src={STARS_ICON} /><span>Stars</span></label>
        <input name="stars" id="stars" type="number" value={player.stars} onChange={handleChange} />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="coins"><img src={COIN_ICON} /><span>Coins</span></label>
        <input name="coins" id="coins" type="number" value={player.coins} onChange={handleChange} />
      </div>
      <div className={classes.formgroup}>
        <label htmlFor="name">Name</label>
        <input name="name" id="name" type="text" value={player.name} onChange={handleChange} />
      </div>
      <button type="submit" onClick={handleUpdate}>Update</button>
    </form>
  )
};

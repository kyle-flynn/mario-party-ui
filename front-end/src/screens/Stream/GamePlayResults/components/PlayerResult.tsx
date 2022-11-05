import { FC } from "react";
import classes from "./PlayerResult.module.less";
import { Player } from "../../../../AppTypes";

import MARIO_AVATAR from "../../../../assets/mario-avatar.png";
import COIN_ICON from "../../../../assets/coin-icon.png";
import STAR_ICON from "../../../../assets/star-icon.png";
import BACKGROUND from "../../../../assets/player-backdrop.png";

interface Props {
  player: Player;
}

const PlayerResult: FC<Props> = ({ player }) => {
  return (
    <div
      style={{ backgroundImage: `url(${BACKGROUND})` }}
      className={classes.playerContainer}
    >
      <span className={`center ${classes.playerRank}`}>{player.rank}</span>
      <div className={classes.playerImage}>
        <img src={MARIO_AVATAR} />
      </div>
      <div className={`center ${classes.playerStat}`}>
        <img src={STAR_ICON} />
      </div>
      <span className={`center ${classes.playerStars}`}>{player.stars}</span>
      <span className={`center ${classes.playerNewCoins}`}>{player.newCoins}</span>
      <div className={`center ${classes.playerStat}`}>
        <img src={COIN_ICON} />
      </div>
      <span className={`center ${classes.playerCoins}`}>{player.coins}</span>
    </div>
  );
};

export default PlayerResult;

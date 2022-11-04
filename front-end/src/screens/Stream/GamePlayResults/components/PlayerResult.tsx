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
      <div className={classes.playerResult}>
        <div className={classes.playerRank}>{player.rank}</div>
        <div className={classes.playerAvatar}>
          <img src={MARIO_AVATAR} />
        </div>
        <div className={classes.playerStat}>
          <div className="center">
            <img src={STAR_ICON} />
          </div>
          <span className={classes.playerStars}>{player.stars}</span>
        </div>
        <div className={classes.playerStat}>
          <div className="center">
            <img src={COIN_ICON} />
          </div>
          <span>{player.coins}</span>
        </div>
      </div>
      {/* <div className={classes.playerName}>{player.name}</div> */}
    </div>
  );
};

export default PlayerResult;

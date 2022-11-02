import { FC } from "react";
import classes from "./PlayerView.module.less";
import MARIO_AVATAR from "../../../../assets/mario-avatar.png";
import COIN_ICON from "../../../../assets/coin-icon.png";
import STAR_ICON from "../../../../assets/star-icon.png";
import { Player } from "../../../../AppTypes";

interface Props {
  player: Player;
}

const PlayerView: FC<Props> = ({ player }) => {
  return (
    <div className={classes.player}>
      <div className={classes.playerInfo}>
        <div className={classes.playerAvatar}>
          <div className={classes.playerAvatarContainer}>
            <img src={MARIO_AVATAR} />
          </div>
          <div className={classes.playerRank}>{player.rank}</div>
        </div>
        <div className={classes.playerStats}>
          <div className={classes.statRow}>
            <div className="center">
              <img src={COIN_ICON} />
            </div>
            <span className={classes.stars}>
              <b>{player.stars}</b>
            </span>
          </div>
          <div className={classes.statRow}>
            <div className="center">
              <img src={STAR_ICON} />
            </div>
            <span>{player.coins}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerView;

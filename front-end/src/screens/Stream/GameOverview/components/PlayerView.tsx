import { FC } from "react";
import classes from "./PlayerView.module.less";
import MARIO_AVATAR from "../../../../assets/mario-avatar.png";
import COIN_ICON from "../../../../assets/coin-icon.png";
import STAR_ICON from "../../../../assets/star-icon.png";

const PlayerView: FC = () => {
  return (
    <div className={classes.player}>
      <div className={classes.playerInfo}>
        <div className={classes.playerAvatar}>
          <div className={classes.playerAvatarContainer}>
            <img src={MARIO_AVATAR} />
          </div>
          <div className={classes.playerRank}>1st</div>
        </div>
        <div className={classes.playerStats}>
          <div className={classes.statRow}>
            <span>
              <img src={COIN_ICON} />
            </span>
            <span className={classes.stars}>
              <b>0</b>
            </span>
          </div>
          <div className={classes.statRow}>
            <span>
              <img src={STAR_ICON} />
            </span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerView;

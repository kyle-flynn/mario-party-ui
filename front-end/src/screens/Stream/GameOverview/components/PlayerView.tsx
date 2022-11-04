import { FC } from "react";
import classes from "./PlayerView.module.less";
import MARIO_AVATAR from "../../../../assets/mario-avatar.png";
import COIN_ICON from "../../../../assets/coin-icon.png";
import STAR_ICON from "../../../../assets/star-icon.png";
import { Player } from "../../../../AppTypes";

interface Props {
  player: Player;
  avatarClass?: string;
}

const PlayerView: FC<Props> = ({ player, avatarClass }) => {
  const getRankText = () => {
    switch (player.rank) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      case 4:
        return "4th";
      default:
        return "";
    }
  };

  return (
    <div className={classes.player}>
      <div className={classes.playerInfo}>
        <div className={classes.playerAvatar}>
          <div className={`${avatarClass} ${classes.playerAvatarContainer}`}>
            {/* <img src={MARIO_AVATAR} /> */}
          </div>
          <div className={classes.playerRank}>{getRankText()}</div>
        </div>
        <div className={classes.playerStats}>
          <div className={classes.statRow}>
            <div className="center">
              <img src={STAR_ICON} />
            </div>
            <div className={`center ${classes.stars}`}>
              <b>{player.stars}</b>
            </div>
          </div>
          <div className={classes.statRow}>
            <div className="center">
              <img src={COIN_ICON} />
            </div>
            <div className="center">
              <span>{player.coins}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerView;

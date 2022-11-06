import { FC } from "react";
import classes from "./PlayerView.module.less";
import COIN_ICON from "../../../../assets/coin-icon.png";
import STAR_ICON from "../../../../assets/star-icon.png";
import { Rank } from "../../../../components/Rank";
import { useRecoilValue } from "recoil";
import { playerSelectorFam } from "../../../../stores/Recoil";

interface Props {
  playerId: number;
  avatarClass?: string;
}

const PlayerView: FC<Props> = ({ playerId, avatarClass }) => {
  const player = useRecoilValue(playerSelectorFam(playerId));

  if (!player) return null;

  return (
    <div className={classes.player}>
      <div className={classes.playerInfo}>
        <div className={classes.playerAvatar}>
          <div className={`${avatarClass} ${classes.playerAvatarContainer}`}>
            <img src={player.avatarUrl} />
          </div>
          <div className={classes.playerRank}>
            <Rank rank={player.rank} />
          </div>
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

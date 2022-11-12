import { FC, useState, useEffect } from "react";
import classes from "./PlayerView.module.less";
import { Rank } from "../../../../components/Rank";
import { useRecoilValue } from "recoil";
import { playerSelectorFam } from "../../../../stores/Recoil";
import { useSocket } from "../../../../providers/ApiProvier";

import COIN_ICON from "../../../../assets/coin-icon.png";
import STAR_ICON from "../../../../assets/star-icon.png";
interface Props {
  playerId: number;
  avatarClass?: string;
}

const PlayerView: FC<Props> = ({ playerId, avatarClass }) => {
  const player = useRecoilValue(playerSelectorFam(playerId));
  const [updated, setUpdated] = useState(false);
  const [socket, connected] = useSocket();

  useEffect(() => {
    if (connected) {
      socket?.on('update', handleUpdate);
    }
    return () => {
      socket?.off('update', handleUpdate);
    };
  }, [connected]);

  if (!player) return null;

  const handleUpdate = () => {
    setUpdated(true);
    console.log('update');
    setTimeout(() => {
      setUpdated(false);
    }, 10000);
  };

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
          <div className={classes.playerItems}>
            {player.items.map((i) => (
              <div className="center">
                <img src={i.avatarUrl} />
              </div>
            ))}
          </div>
          <div className={`${classes.playerAdds} ${updated && classes.fadeOut}`}>
              <div className="center">
                <span className={player.newStars === 0 ? classes.opaque : ''}>{player.newStars >= 0 && '+'}{player.newStars}</span>
              </div>
              <div className="center">
                <span className={player.newCoins === 0 ? classes.opaque : ''}>{player.newCoins >= 0 && '+'}{player.newCoins}</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerView;

import { FC } from "react";
import { Rank } from "../../../../components/Rank";
import { useRecoilValue } from "recoil";
import { playerSelectorFam } from "../../../../stores/Recoil";
import classes from "./PlayerRanking.module.less";

import COIN_ICON from "../../../../assets/coin-icon.png";
import STAR_ICON from "../../../../assets/star-icon.png";
import BACKGROUND from "../../../../assets/player-backdrop.png";

interface Props {
  playerId: number;
}

const PlayerResult: FC<Props> = ({ playerId }) => {
  const player = useRecoilValue(playerSelectorFam(playerId));

  if (!player) return null;

  return (
    <div
      style={{
        backgroundImage: `url(${BACKGROUND})`,
        top: `${player.rank * 19}vh`,
      }}
      className={classes.playerContainer}
    >
      <span className={`center ${classes.playerRank}`}>
        <Rank rank={player.rank} />
      </span>
      <div className={classes.playerImage}>
        <img src={player.avatarUrl} />
      </div>
      <div className={`center ${classes.playerStat}`}>
        <img src={STAR_ICON} />
      </div>
      <span className={`center ${classes.playerStars}`}>{player.stars}</span>
      <span className={`center ${classes.playerNewCoins}`}>
        {player.newCoins >= 0 && "+"}
        {player.newCoins}
      </span>
      <div className={`center ${classes.playerStat}`}>
        <img src={COIN_ICON} />
      </div>
      <span className={`center ${classes.playerCoins}`}>{player.coins}</span>
    </div>
  );
};

export default PlayerResult;

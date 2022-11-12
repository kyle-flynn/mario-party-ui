import { FC } from "react";
import PlayerRanking from "./components/PlayerRanking";
import classes from "./GamePlayRankings.module.less";

export const GamePlayRankings: FC = () => {
  return (
    <div className={classes.screenContainer}>
      <div className={classes.screenHeader}>Player Rankings</div>
      <div className={classes.screenContent}>
        <PlayerRanking playerId={1} />
        <PlayerRanking playerId={2} />
        <PlayerRanking playerId={3} />
        <PlayerRanking playerId={4} />
      </div>
    </div>
  );
};

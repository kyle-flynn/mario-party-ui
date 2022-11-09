import { FC } from "react";
import PlayerResult from "./components/PlayerResult";
import classes from "./GamePlayResults.module.less";

export const GamePlayResults: FC = () => {
  return (
    <div className={classes.screenContainer}>
      <div className={classes.screenHeader}>Player Rankings</div>
      <div className={classes.screenContent}>
        <PlayerResult playerId={1} />
        <PlayerResult playerId={2} />
        <PlayerResult playerId={3} />
        <PlayerResult playerId={4} />
      </div>
    </div>
  );
};

import { FC } from "react";
import PlayerResult from "./components/PlayerResult";
import classes from './GamePlayResults.module.less';

export const GamePlayResults: FC = () => {
  return <div className={classes.screenContainer}>
    <div className={classes.screenHeader}>Minigame Results</div>
    <div className={classes.screenContent}>
      <PlayerResult />
      <PlayerResult />
      <PlayerResult />
      <PlayerResult />
    </div>
  </div>;
};

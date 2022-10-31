import { FC } from "react";
import PlayerView from "./components/PlayerView";
import classes from './GameOverview.module.less';

export const GameOverview: FC = () => {
  return (
    <div className={classes.playerContainer}>
      <PlayerView />
      <PlayerView />
      <PlayerView />
      <PlayerView />
    </div>
  );
};

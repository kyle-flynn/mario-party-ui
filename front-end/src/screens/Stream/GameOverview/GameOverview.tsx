import { FC } from "react";
import PlayerView from "./components/PlayerView";
import classes from "./GameOverview.module.less";

export const GameOverview: FC = () => {
  return (
    <div className={classes.playerContainer}>
      <PlayerView playerId={1} avatarClass={classes.player1} />
      <PlayerView playerId={2} avatarClass={classes.player2} />
      <PlayerView playerId={3} avatarClass={classes.player3} />
      <PlayerView playerId={4} avatarClass={classes.player4} />
    </div>
  );
};

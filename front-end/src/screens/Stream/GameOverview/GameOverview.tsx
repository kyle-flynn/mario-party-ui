import { FC } from "react";
import { useRecoilValue } from "recoil";
import { currentGameAtom } from "../../../stores/Recoil";
import PlayerView from "./components/PlayerView";
import classes from "./GameOverview.module.less";

export const GameOverview: FC = () => {
  const game = useRecoilValue(currentGameAtom);

  return (
    <div className={classes.playerContainer}>
      <PlayerView player={game.players[0]} avatarClass={classes.player1} />
      <PlayerView player={game.players[1]} avatarClass={classes.player2} />
      <PlayerView player={game.players[2]} avatarClass={classes.player3} />
      <PlayerView player={game.players[3]} avatarClass={classes.player4} />
    </div>
  );
};

import { FC } from "react";
import { useRecoilValue } from "recoil";
import { currentGameAtom } from "../../../stores/Recoil";
import PlayerView from "./components/PlayerView";
import classes from "./GameOverview.module.less";

export const GameOverview: FC = () => {
  const game = useRecoilValue(currentGameAtom);

  return (
    <div className={classes.playerContainer}>
      <PlayerView player={game.players[0]} />
      <PlayerView player={game.players[1]} />
      <PlayerView player={game.players[2]} />
      <PlayerView player={game.players[3]} />
    </div>
  );
};

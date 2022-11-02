import { FC } from "react";
import { useRecoilValue } from "recoil";
import { currentGameAtom } from "../../../stores/Recoil";
import PlayerResult from "./components/PlayerResult";
import classes from "./GamePlayResults.module.less";

export const GamePlayResults: FC = () => {
  const game = useRecoilValue(currentGameAtom);

  return (
    <div className={classes.screenContainer}>
      <div className={classes.screenHeader}>Player Rankings</div>
      <div className={classes.screenContent}>
        <PlayerResult player={game.players[0]} />
        <PlayerResult player={game.players[1]} />
        <PlayerResult player={game.players[2]} />
        <PlayerResult player={game.players[3]} />
      </div>
    </div>
  );
};

import { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { currentGameAtom } from "../../../stores/Recoil";
import PlayerResult from "./components/PlayerResult";
import classes from "./GamePlayResults.module.less";

export const GamePlayResults: FC = () => {
  const players = useRecoilValue(currentGameAtom).players;

  const sortedIds = useMemo(() => {
    return [...players].sort((a, b) => a.rank - b.rank).map((p) => p.id);
  }, [players]);

  return (
    <div className={classes.screenContainer}>
      <div className={classes.screenHeader}>Player Rankings</div>
      <div className={classes.screenContent}>
        <PlayerResult playerId={sortedIds[0]} />
        <PlayerResult playerId={sortedIds[1]} />
        <PlayerResult playerId={sortedIds[2]} />
        <PlayerResult playerId={sortedIds[3]} />
      </div>
    </div>
  );
};

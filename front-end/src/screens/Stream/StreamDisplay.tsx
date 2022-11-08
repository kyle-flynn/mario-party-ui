import { FC, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { chromaKeyAtom, currentDisplayId } from "../../stores/Recoil";
import { GameOverview } from "./GameOverview";
import { GamePlayResults } from "./GamePlayResults";
import classes from "./StreamDisplay.module.less";

export const StreamDisplay: FC = () => {
  const backgroundColor = useRecoilValue(chromaKeyAtom);
  const displayId = useRecoilValue(currentDisplayId);
  const { id } = useParams();
  return (
    <div
      style={{ backgroundColor }}
      className={`container ${classes.screenContainer}`}
    >
      {getDisplay(id ? parseInt(id) : displayId)}
    </div>
  );
};

function getDisplay(id: number): ReactNode {
  switch (id) {
    case 0:
      return <GameOverview />;
    case 1:
      return <GamePlayResults />;
    default:
      return <GameOverview />;
  }
}

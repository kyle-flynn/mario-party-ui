import { FC, ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { chromaKeyAtom, currentDisplayId } from "../../stores/Recoil";
import { GameOverview } from "./GameOverview";
import { GamePlay } from "./GamePlay";
import { GamePlayResults } from "./GamePlayResults";

export const StreamDisplay: FC = () => {
  const backgroundColor = useRecoilValue(chromaKeyAtom);
  const displayId = useRecoilValue(currentDisplayId);

  return (
    <div style={{ backgroundColor }} className="container">
      {getDisplay(displayId)}
    </div>
  );
};

function getDisplay(id: number): ReactNode {
  switch (id) {
    case 1:
      return <GameOverview />;
    case 0:
      return <GamePlay />;
    case 2:
      return <GamePlayResults />;
    default:
      return <GameOverview />;
  }
}

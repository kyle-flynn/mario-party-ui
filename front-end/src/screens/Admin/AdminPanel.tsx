import { FC, MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { useSocket } from "../../providers/ApiProvier";
import { chromaKeyAtom } from "../../stores/Recoil";
import classes from "./AdminPanel.module.less";

export const AdminPanel: FC = () => {
  const [chromaKey, setChromaKey] = useRecoilState(chromaKeyAtom);

  const [socket] = useSocket();

  const setToOverview = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket?.emit("display", 0);
  };
  const setToRankings = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket?.emit("display", 1);
  };

  return (
    <div className={`container ${classes.adminPanel}`}>
      <div>
        <h1>Mario Party Admin Panel</h1>
        <div>
          <form>
            <label htmlFor="chroma">Chroma Key</label>
            <input id="chroma" type="text" value={chromaKey} />
            <button>Update</button>
          </form>
          <form>
            <button onClick={setToOverview}>Game Overview</button>
            <button onClick={setToRankings}>Game Rankings</button>
          </form>
        </div>
      </div>
    </div>
  );
};

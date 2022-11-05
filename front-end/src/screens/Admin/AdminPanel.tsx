import { ChangeEvent, FC, MouseEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSocket } from "../../providers/ApiProvier";
import { chromaKeyAtom, currentGameAtom } from "../../stores/Recoil";
import classes from "./AdminPanel.module.less";
import { PlayerForm } from "./components/PlayerForm";

export const AdminPanel: FC = () => {
  const [chromaKey, setChromaKey] = useRecoilState(chromaKeyAtom);
  const game = useRecoilValue(currentGameAtom);

  const [socket] = useSocket();

  const changeChromaKey = (e: ChangeEvent<HTMLInputElement>) => {
    setChromaKey(e.target.value);
  };
  const handleUpdate = () => {
    socket?.emit("update", game);
  };

  const sendChromaKey = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket?.emit("chroma", chromaKey);
  }
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
        <div className={classes.adminForms}>
          <form>
            <h1>Display Settings</h1>
            <label htmlFor="chroma">Chroma Key</label>
            <input id="chroma" type="text" value={chromaKey} onChange={changeChromaKey} />
            <button onClick={sendChromaKey}>Update</button>
          </form>
          <form>
            <h1>Display Screens</h1>
            <button onClick={setToOverview}>Game Overview</button>
            <button onClick={setToRankings}>Game Rankings</button>
          </form>
        </div>
        <div className={classes.adminForms}>
          <PlayerForm onUpdate={handleUpdate} playerId={1} />
          <PlayerForm onUpdate={handleUpdate} playerId={2} />
          <PlayerForm onUpdate={handleUpdate} playerId={3} />
          <PlayerForm onUpdate={handleUpdate} playerId={4} />
        </div>
      </div>
    </div>
  );
};

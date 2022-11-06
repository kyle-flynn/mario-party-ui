import { ChangeEvent, FC, MouseEvent } from "react";
import { useRecoilCallback, useRecoilState } from "recoil";
import { useSocket } from "../../providers/ApiProvier";
import { chromaKeyAtom, currentGameAtom } from "../../stores/Recoil";
import classes from "./AdminPanel.module.less";
import { PlayerForm } from "./components/PlayerForm";

export const AdminPanel: FC = () => {
  const [chromaKey, setChromaKey] = useRecoilState(chromaKeyAtom);

  const [socket] = useSocket();

  const changeChromaKey = (e: ChangeEvent<HTMLInputElement>) => {
    setChromaKey(e.target.value);
  };
  const handleUpdate = useRecoilCallback(({ snapshot }) => async () => {
    const promisedGame = await snapshot.getPromise(currentGameAtom);
    socket?.emit("update", promisedGame);
  });

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
            <div className={classes.formgroup}>
              <label htmlFor="chroma">Chroma Key</label>
              <input id="chroma" type="text" value={chromaKey} onChange={changeChromaKey} />
            </div>
            <button onClick={sendChromaKey}>Update</button>
          </form>
          <form>
            <h1>Display Screens</h1>
            <div className={classes.formgroup}>
              <button onClick={setToOverview}>Game Overview</button>
              <button onClick={setToRankings}>Game Rankings</button>
            </div>
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

import { ChangeEvent, FC, MouseEvent } from "react";
import { useRecoilCallback, useRecoilState } from "recoil";
import { useSocket } from "../../providers/ApiProvier";
import { DEFAULT_GAME, DEFAULT_CHROMA_KEY } from "../../stores/Constants";
import {
  chromaKeyAtom,
  currentDisplayId,
  currentGameAtom
} from "../../stores/Recoil";
import { PlayerForm } from "./components/PlayerForm";
import classes from "./AdminPanel.module.less";

export const AdminPanel: FC = () => {
  const [chromaKey, setChromaKey] = useRecoilState(chromaKeyAtom);

  const [socket] = useSocket();

  const changeChromaKey = (e: ChangeEvent<HTMLInputElement>) => {
    setChromaKey(e.target.value);
  };
  const handleUpdate = useRecoilCallback(
    ({ snapshot, set, reset }) =>
      async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const promisedGame = await snapshot.getPromise(currentGameAtom);
        const sortedPlayers = promisedGame.players
          .map((p) => ({
            ...p,
            coins: p.newCoins + p.coins,
            stars: p.newStars + p.stars
          }))
          .sort((a, b) => {
            try {
              if (a.stars !== b.stars) {
                return b.stars - a.stars;
              } else if (a.coins !== b.coins) {
                return b.coins - a.coins;
              } else {
                return 0;
              }
            } catch (e) {
              console.log(e);
              return 0;
            }
          });
        const players = sortedPlayers.map((p, i) => ({
          ...p,
          rank: i + 1,
        }));
        socket?.emit("update", { players });
        set(currentGameAtom, {
          players: players.map((p) => ({ ...p, newCoins: 0, newStars: 0 })),
        });
      }
  );
  const handlePlayerReset = useRecoilCallback(
    ({ set }) =>
      async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        set(currentGameAtom, DEFAULT_GAME);
        socket?.emit("update", DEFAULT_GAME);
      }
  );
  const handleResetAll = useRecoilCallback(
    ({ set }) =>
      async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        set(currentGameAtom, DEFAULT_GAME);
        set(currentDisplayId, 0);
        set(chromaKeyAtom, DEFAULT_CHROMA_KEY);
        socket?.emit("update", DEFAULT_GAME);
        socket?.emit("display", 0);
        socket?.emit("chroma", DEFAULT_CHROMA_KEY);
      }
  );

  const sendChromaKey = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket?.emit("chroma", chromaKey);
  };
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
              <input
                id="chroma"
                type="text"
                value={chromaKey}
                onChange={changeChromaKey}
              />
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
          <PlayerForm playerId={1} />
          <PlayerForm playerId={2} />
          <PlayerForm playerId={3} />
          <PlayerForm playerId={4} />
        </div>
        <div className={classes.adminForms}>
          <form>
            <h1>Update Actions</h1>
            <button onClick={handleUpdate}>Update Players</button>
            <div>
              <button onClick={handlePlayerReset} className={classes.reset}>
                Reset Player Stats
              </button>
              <button onClick={handleResetAll} className={classes.reset}>
                Reset All
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

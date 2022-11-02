import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Game } from "../AppTypes";
import { useSocket } from "../providers/ApiProvier";
import { currentGameAtom } from "../stores/Recoil";

interface Props {
  host: string;
  port: string;
}

export const UpdateListener: FC<Props> = ({ host, port }) => {
  const setGame = useSetRecoilState(currentGameAtom);
  const [socket, connected, setupSocket] = useSocket();

  useEffect(() => {
    if (!connected) {
      setupSocket(host, port);
    }
    if (connected && socket) {
      socket.on("update", handleUpdate);
    }

    return () => {
      socket?.off("update", handleUpdate);
    };
  }, [connected]);

  const handleUpdate = (update: Game) => setGame(update);

  return null;
};

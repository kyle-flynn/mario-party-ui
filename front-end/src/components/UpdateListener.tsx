import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Game } from "../AppTypes";
import { useSocket } from "../providers/ApiProvier";
import {
  chromaKeyAtom,
  currentDisplayId,
  currentGameAtom,
} from "../stores/Recoil";

interface Props {
  host: string;
  port: string;
}

export const UpdateListener: FC<Props> = ({ host, port }) => {
  const setGame = useSetRecoilState(currentGameAtom);
  const setDisplay = useSetRecoilState(currentDisplayId);
  const setChroma = useSetRecoilState(chromaKeyAtom);

  const [socket, connected, setupSocket] = useSocket();

  useEffect(() => {
    if (!connected) {
      setupSocket(host, port);
    }
    if (connected && socket) {
      socket.on("update", handleUpdate);
      socket.on("display", handleDisplay);
      socket.on("chroma", handleChroma);
    }

    return () => {
      socket?.off("update", handleUpdate);
      socket?.off("display", handleDisplay);
      socket?.off("chroma", handleChroma);
    };
  }, [connected]);

  const handleUpdate = (update: Game) => setGame(update);
  const handleDisplay = (display: number) => setDisplay(display);
  const handleChroma = (chroma: string) => setChroma(chroma);

  return null;
};

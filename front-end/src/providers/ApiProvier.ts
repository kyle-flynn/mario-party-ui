import { useRecoilState } from "recoil";
import io, { Socket } from "socket.io-client";
import { sockedConnectedAtom } from "../stores/Recoil";

let socket: Socket | null = null;

function createSocket(host: string, port: string): Socket {
  return io(`ws://${host}:${port}`, { transports: ["websocket"] });
}

export const useSocket = (): [
  Socket | null,
  boolean,
  (host: string, port: string) => void
] => {
  const [connected, setConnected] = useRecoilState(sockedConnectedAtom);

  const setupSocket = (host: string, port: string) => {
    if (socket) return;
    socket = createSocket(host, port);
    initEvents();
  };

  const initEvents = () => {
    if (socket) {
      socket.on("connect", () => {
        setConnected(true);
        console.log("socket connected");
      });
      socket.on("disconnect", (reason) => {
        console.log("socket disconnected", reason);
        setConnected(false);
      });
      socket.on("connect_error", (err) => {
        console.log("connect_error due to " + err);
      });
    }
  };

  return [socket, connected, setupSocket];
};

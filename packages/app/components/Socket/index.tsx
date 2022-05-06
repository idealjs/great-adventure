import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

const context = createContext<Socket | null>(null);

interface IProps {
  socket?: Socket;
}

export const SocketProvider = (props: PropsWithChildren<IProps>) => {
  const { children } = props;
  const [socket, setSocket] = useState<Socket | null>();

  useEffect(() => {
    const socket = io("ws://localhost:3100/");
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  return socket ? (
    <context.Provider value={socket}>{children}</context.Provider>
  ) : null;
};

export const useSocket = () => {
  const socket = useContext(context);
  if (!socket) {
    throw new Error("SocketProvider not found");
  }

  return socket;
};

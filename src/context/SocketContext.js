import { createContext, useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { useAuth } from "./AuthContext";

const baseURL = process.env.CCSIT_RIES;

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const { access_token } = useAuth();
  const [socket, setSocket] = useState(null);

  //* socket connection
  useEffect(() => {
    if (!access_token) return;
    const newSocket = socketIo.connect(baseURL, {
      transports: ["websocket"],
    });

    if (!newSocket) return;
    newSocket.on("connect", () => {
      console.log(`Hurrah newSocket ${newSocket.id} Connected`);

      setSocket(newSocket);
    });
  }, [access_token]);

  const sendNotification = (data) => socket.emit("send-notification", data);

  return (
    <SocketContext.Provider
      displayName="Socket Context"
      value={{
        socket,
        sendNotification,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

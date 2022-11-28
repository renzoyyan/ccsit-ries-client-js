import { createContext, useEffect, useState } from "react";
import socketIo from "socket.io-client";

const baseURL = "http://localhost:5000";

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState(null);

  //* socket connection
  useEffect(() => {
    const newSocket = socketIo.connect(baseURL, {
      transports: ["websocket"],
    });

    if (!newSocket) return;
    newSocket.on("connect", () => {
      console.log(`Hurrah newSocket ${newSocket.id} Connected`);

      setSocket(newSocket);
    });
  }, []);

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

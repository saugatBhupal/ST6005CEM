import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getUserIdFromLocalStorage } from "../../../service/LocalStorageService";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);

  // Fetch the userId from localStorage
  useEffect(() => {
    async function updateUserId() {
      try {
        const userID = await getUserIdFromLocalStorage();
        setUserId(userID);
      } catch (error) {
        console.error("Failed to get userId from localStorage", error);
      }
    }
    updateUserId();
  }, []);
  useEffect(() => {
    if (userId) {
      const newSocket = io("http://localhost:3000", {
        query: { userId: userId },
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

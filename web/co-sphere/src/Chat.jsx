// src/Chat.js
import React, { useEffect, useState } from "react";
import { useSocket } from "./common/manager/contextManager/SocketContextManager";

const Chat = () => {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      alert(message);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const sendMessage = () => {
    if (message) {
      socket.emit("sendMessage", message);
      //   setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h2>Chat Room</h2>
      <div
        style={{ height: "200px", overflowY: "scroll", marginBottom: "20px" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{ padding: "5px", borderBottom: "1px solid #eee" }}
          >
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        style={{ width: "80%", padding: "10px" }}
      />
      <button
        onClick={sendMessage}
        style={{ padding: "10px", marginLeft: "10px" }}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;

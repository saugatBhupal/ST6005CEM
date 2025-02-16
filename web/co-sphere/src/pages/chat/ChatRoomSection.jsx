import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSocket } from "../../common/manager/contextManager/SocketContextManager";
import SendMessageButton from "../../components/buttons/SendMessageButton";
import BorderlessInputbar from "../../components/input/BorderlessInputbar";
import ChatMessageCard from "../../components/widget/chat/ChatMessageCard";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import { getUserIdFromLocalStorage } from "../../service/LocalStorageService";
import { manageGetAllMessages, manageSendMessage } from "./manager/ChatManager";

const Wrapper = styled.div`
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Top = styled.div`
  border-left: 0.5px solid ${Colors.greyOutlineShadow};
  border-bottom: 0.5px solid ${Colors.greyOutlineShadow};
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
  align-items: center;
  background-color: ${Colors.justWhite};
`;

const Center = styled.div`
  flex-grow: 1;
  background-color: ${Colors.chatBackground};
  padding: 20px;
  max-height: calc(100% - 90px - 60px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Bottom = styled.div`
  height: 60px;
  background-color: ${Colors.justWhite};
  border-left: 0.5px solid ${Colors.greyOutlineShadow};
  border-top: 0.5px solid ${Colors.greyOutlineShadow};
`;
const Name = styled.div`
  font-weight: 400;
  margin-left: 5px;
  font-size: ${FontSize.medium};
`;
const Action = styled.div`
  cursor: pointer;
`;
const MessageSection = styled.div`
  display: flex;
  align-items: center;
  padding-right: 40px;
  padding-left: 10px;
`;
const Gap = styled.div`
  padding: 10px;
`;
function ChatRoomSection() {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    async function updateUserId() {
      const userId = await getUserIdFromLocalStorage();
      setUserId(userId);
    }
    updateUserId();
  });
  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  // useEffect(() => {
  //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  useEffect(() => {
    async function getAllMessages() {
      await manageGetAllMessages(
        "67b199361951254f65c360f5",
        (messages) => {
          setMessages(messages);
        },
        (e) => {
          alert(e);
        }
      );
    }
    getAllMessages();
  }, []);
  const handleSubmit = () => {
    manageSendMessage(
      {
        senderId: userId,
        content: message,
      },
      () => {
        alert("success");
        setMessage("");
      },
      (err) => {
        alert(err);
      }
    );
  };
  return (
    <Wrapper>
      <Container>
        <Top>
          <Name>Lexi Anderson</Name>
          <Action>
            <a>•••</a>
          </Action>
        </Top>
        <Center>
          {messages &&
            messages.map((message, i) => (
              <ChatMessageCard
                message={message.content}
                isUser={userId === message.sender}
              />
            ))}
          <Gap> </Gap>
          <div ref={messageEndRef} />
        </Center>
        <Bottom>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <MessageSection>
              <BorderlessInputbar
                placeholder={"Write something...."}
                onChange={(value) => {
                  setMessage(value);
                }}
                value={message}
              />
              <SendMessageButton onClick={() => handleSubmit()} />
            </MessageSection>
          </form>
        </Bottom>
      </Container>
    </Wrapper>
  );
}

export default ChatRoomSection;

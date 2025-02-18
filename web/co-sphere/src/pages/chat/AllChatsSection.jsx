import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchInputChat from "../../components/input/search/SearchInputChat";
import ChatCard from "../../components/widget/chat/ChatCard";
import { Colors } from "../../constants/Colors";
import ChatRoomSection from "./ChatRoomSection";
import { manageGetAllConversations } from "./manager/ConversationManager";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${Colors.justWhite};
  border-right: 0.5px solid ${Colors.greyOutlineShadow};
`;
const Container = styled.div`
  height: inherit;
  overflow-y: scroll;
`;

function AllChatsSection({ userId, onClick }) {
  const [conversations, setConversations] = useState(null);
  const [reload, setReload] = useState("");
  const [selectedRoomID, setSelectedRoomID] = useState();

  useEffect(() => {
    async function updateConversations() {
      if (userId !== null)
        await manageGetAllConversations(
          userId,
          (res) => {
            setConversations(res);
          },
          (err) => {
            alert(err);
          }
        );
    }
    updateConversations();
  }, [userId, reload]);
  return (
    <Wrapper>
      <Container>
        <SearchInputChat />
        {conversations &&
          conversations.map((conversation, index) => (
            <ChatCard
              key={index}
              user={
                conversation.members.filter(
                  (member) => member._id !== userId
                )[0]
              }
              message={conversation.messages}
              seen={"false"}
              userId={userId}
              selected={selectedRoomID === conversation._id}
              onClick={() => {
                setSelectedRoomID(conversation._id);
                onClick(
                  <ChatRoomSection
                    userId={userId}
                    username={
                      conversation.members.filter(
                        (member) => member._id !== userId
                      )[0].fullname
                    }
                    conversationId={conversation._id}
                    onNewMessage={(message) => setReload(message)}
                  />
                );
              }}
            />
          ))}
      </Container>
    </Wrapper>
  );
}

export default AllChatsSection;

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

function AllChatsSection({ userId, onClick, roomId }) {
  const [conversations, setConversations] = useState(null);
  const [reload, setReload] = useState("");
  const [selectedRoomID, setSelectedRoomID] = useState();
  const [change, setChange] = useState(true);

  useEffect(() => {
    async function updateConversations() {
      if (userId !== null)
        await manageGetAllConversations(
          userId,
          (res) => setConversations(res),
          (err) => alert(err)
        );
    }
    updateConversations();
  }, [userId, reload]);

  useEffect(() => {
    if (roomId) {
      if (change) {
        setSelectedRoomID(roomId);
      }
      setChange(false);
      const selectedConversation = conversations?.find(
        (conversation) => conversation._id === selectedRoomID
      );

      if (selectedConversation) {
        const otherUser = selectedConversation.members.find(
          (member) => member._id !== userId
        );
        onClick(
          <ChatRoomSection
            userId={userId}
            username={otherUser?.fullname}
            conversationId={selectedConversation._id}
            onNewMessage={(message) => setReload(message)}
          />
        );
      }
    }
  }, [roomId, conversations]); // ✅ Runs only when roomId or conversations update

  return (
    <Wrapper>
      <Container>
        <SearchInputChat />
        {conversations &&
          conversations.map((conversation, index) => {
            const otherUser = conversation.members.find(
              (member) => member._id !== userId
            );

            return (
              <ChatCard
                key={index}
                user={otherUser}
                message={conversation.messages}
                seen={"false"}
                userId={userId}
                selected={selectedRoomID === conversation._id}
                onClick={() => {
                  setSelectedRoomID(conversation._id);
                  onClick(
                    <ChatRoomSection
                      userId={userId}
                      username={otherUser?.fullname}
                      conversationId={conversation._id}
                      onNewMessage={(message) => setReload(message)}
                    />
                  );
                }}
              />
            );
          })}
      </Container>
    </Wrapper>
  );
}

export default AllChatsSection;

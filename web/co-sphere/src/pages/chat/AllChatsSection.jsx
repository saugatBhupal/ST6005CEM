import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchInputChat from "../../components/input/search/SearchInputChat";
import ChatCard from "../../components/widget/chat/ChatCard";
import { Colors } from "../../constants/Colors";
import { getUserIdFromLocalStorage } from "../../service/LocalStorageService";
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

function AllChatsSection() {
  const [userId, setUserId] = useState(null);
  const [conversations, setConversations] = useState(null);

  useEffect(() => {
    async function updateUserId() {
      setUserId(await getUserIdFromLocalStorage());
    }
    updateUserId();
  }, []);

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
  }, [userId]);
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
              message={conversation.message}
              seen={"false"}
              userId={userId}
            />
          ))}
      </Container>
    </Wrapper>
  );
}

export default AllChatsSection;

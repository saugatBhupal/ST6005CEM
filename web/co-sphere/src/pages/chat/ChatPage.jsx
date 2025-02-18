import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NoChatsSelected from "../../components/widget/chat/NoChatsSelected";
import { getUserIdFromLocalStorage } from "../../service/LocalStorageService";
import LoggedInUserLayout from "../common/LoggedInUserLayout";
import AllChatsSection from "./AllChatsSection";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  height: 100%;
  display: flex;
`;
const Left = styled.div`
  width: 350px;
`;
const Right = styled.div`
  flex: 1;
  width: auto;
`;

function ChatPage() {
  const [userId, setUserId] = useState();
  const [chatRoom, setChatroom] = useState();

  useEffect(() => {
    async function updateUserId() {
      const userId = await getUserIdFromLocalStorage();
      setUserId(userId);
    }
    updateUserId();
  });
  return (
    <>
      {userId && (
        <LoggedInUserLayout
          body={
            <Wrapper>
              <Container>
                <Left>
                  <AllChatsSection
                    userId={userId}
                    onClick={(room) => setChatroom(room)}
                  />
                </Left>
                <Right>{chatRoom ?? <NoChatsSelected />}</Right>
              </Container>
            </Wrapper>
          }
        />
      )}
    </>
  );
}

export default ChatPage;

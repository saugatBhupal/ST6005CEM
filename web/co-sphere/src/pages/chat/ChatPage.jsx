import React from "react";
import styled from "styled-components";
import LoggedInUserLayout from "../common/LoggedInUserLayout";
import AllChatsSection from "./AllChatsSection";
import ChatRoomSection from "./ChatRoomSection";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
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
  return (
    <LoggedInUserLayout
      body={
        <Wrapper>
          <Container>
            <Left>
              <AllChatsSection />
            </Left>
            <Right>
              <ChatRoomSection />
            </Right>
          </Container>
        </Wrapper>
      }
    />
  );
}

export default ChatPage;

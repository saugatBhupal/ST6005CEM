import React from "react";
import styled from "styled-components";
import SearchInputChat from "../../components/input/search/SearchInputChat";
import ChatCard from "../../components/widget/chat/ChatCard";
import { Colors } from "../../constants/Colors";

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
  return (
    <Wrapper>
      <Container>
        <SearchInputChat />
        <ChatCard seen={false} />
        <ChatCard seen={false} />
        <ChatCard seen={true} />
        <ChatCard seen={true} />
      </Container>
    </Wrapper>
  );
}

export default AllChatsSection;

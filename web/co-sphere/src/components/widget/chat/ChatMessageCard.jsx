import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import ProfileIcon from "../../icon/ProfileIcon";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isUser }) => (isUser ? `end` : `start`)};
`;
const Container = styled.div`
  max-width: 80%;
  min-width: 20px;
  display: flex;
  flex-direction: column;
  width: fit-content;
`;
const Flex = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: ${({ isUser }) => (isUser ? `row-reverse` : `initial`)};
`;
const Message = styled.div`
  padding: 20px;
  border-radius: 18px;
  margin-left: 10px;
  background-color: ${({ isUser }) =>
    isUser ? `${Colors.mainBlue};` : `${Colors.messageSenderBackground};`};
  color: ${({ isUser }) => (isUser ? `${Colors.justWhite};` : `initial`)};
`;
const Time = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: ${Colors.subtitleBlack};
  align-self: flex-end;
  margin-top: 2px;
  margin-right: ${({ isUser }) => (isUser ? `55px` : `initial`)};
`;
function ChatMessageCard({ message, isUser }) {
  return (
    <Wrapper isUser={isUser}>
      <Container>
        <Flex isUser={isUser}>
          <ProfileIcon height={"52px"} />
          <Message isUser={isUser}>{message}</Message>
        </Flex>
        <Time isUser={isUser}>2:36 pm</Time>
      </Container>
    </Wrapper>
  );
}

export default ChatMessageCard;

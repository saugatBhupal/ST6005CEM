import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import { convertToTime } from "../../../utils/date/ConvertToTime";
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
  width: fit-content;
  padding: 15px 18px;
  border-radius: 18px;
  font-size: ${FontSize.small};

  background-color: ${({ isUser }) =>
    isUser ? `${Colors.mainBlue};` : `${Colors.messageSenderBackground};`};
  color: ${({ isUser }) => (isUser ? `${Colors.justWhite};` : `initial`)};
`;
const Time = styled.div`
  width: fit-content;
  font-weight: 300;
  font-size: ${FontSize.tiny};
  color: ${Colors.subtitleBlack};
  margin-top: 4px;
  margin-left: ${({ isUser }) => (isUser ? `0px;` : `10px`)};
  margin-right: ${({ isUser }) => (isUser ? `10px;` : `0px`)};
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isUser }) => (isUser ? `end` : `start`)};
  margin-left: ${({ isUser }) => (isUser ? `0px;` : `10px`)};
  margin-right: ${({ isUser }) => (isUser ? `10px;` : `0px`)};
`;
function ChatMessageCard({ message, isUser }) {
  return (
    <Wrapper isUser={isUser}>
      <Container>
        <Flex isUser={isUser}>
          <ProfileIcon height={"52px"} />
          <Column isUser={isUser}>
            <Message isUser={isUser}>{message.content}</Message>
            <Time isUser={isUser}>{convertToTime(message.sent)}</Time>
          </Column>
        </Flex>
      </Container>
    </Wrapper>
  );
}

export default ChatMessageCard;

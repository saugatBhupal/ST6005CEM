import React from "react";
import styled from "styled-components";
import SendMessageIcon from "../../components/icon/SendMessageIcon";
import BorderlessInputbar from "../../components/input/BorderlessInputbar";
import ChatMessageCard from "../../components/widget/chat/ChatMessageCard";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

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
  flex-direction: column-reverse;
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
          <ChatMessageCard
            message={"Hello nice to meet you my friend? Whats up my bro!"}
            isUser={false}
          />
          <ChatMessageCard message={"I am fine thankyou"} isUser={true} />
          <ChatMessageCard
            message={"What is it that you want?"}
            isUser={true}
          />
          <ChatMessageCard
            message={"I wanted to know your name"}
            isUser={false}
          />
          <ChatMessageCard message={"My name is on the screen"} isUser={true} />
          <ChatMessageCard message={"Oh Sorry im stupid "} isUser={false} />
          <ChatMessageCard
            message={"Hello nice to meet you my friend? Whats up my bro!"}
            isUser={false}
          />
          <ChatMessageCard
            message={"I wanted to know your name"}
            isUser={false}
          />
          <ChatMessageCard message={"My name is on the screen"} isUser={true} />
          <ChatMessageCard message={"Oh Sorry im stupid "} isUser={false} />
          <ChatMessageCard
            message={"Hello nice to meet you my friend? Whats up my bro!"}
            isUser={false}
          />
          <Gap> </Gap>
        </Center>
        <Bottom>
          <MessageSection>
            <BorderlessInputbar placeholder={"Write something...."} />
            <SendMessageIcon />
          </MessageSection>
        </Bottom>
      </Container>
    </Wrapper>
  );
}

export default ChatRoomSection;

import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import ContentNotification from "./ContentNotification";
import JobNotification from "./JobNotification";
import MessageNotification from "./MessageNotification";

const Wrapper = styled.div`
  /* width: 100%; */
  height: calc(100vh - 195px);
  background-color: white;
  border: 1px solid ${Colors.greyOutlineShadow};
  border-radius: 18px;
`;
const TopBar = styled.div`
  height: 60px;
  width: 100%;
  border-bottom: 1px solid ${Colors.greyOutlineShadow};
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  height: inherit;
  margin: auto 20px;
`;
const Title = styled.div`
  font-size: ${FontSize.medium};
  color: ${Colors.subtitleBlack};
`;
const Content = styled.div``;
const Container = styled.div``;
function NotificationWidget() {
  return (
    <Wrapper>
      <Container>
        <TopBar>
          <Flex>
            <Title>Notifications</Title>
          </Flex>
        </TopBar>
        <Content>
          <ContentNotification />
          <MessageNotification />
          <JobNotification />
          <ContentNotification />
        </Content>
      </Container>
    </Wrapper>
  );
}

export default NotificationWidget;

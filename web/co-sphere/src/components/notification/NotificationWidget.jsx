import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div`
  min-width: 350px;
  max-width: 450px;
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
const Content = styled.div``;
const Container = styled.div``;
function NotificationWidget() {
  return (
    <Wrapper>
      <Container>
        <TopBar></TopBar>
        <Content></Content>
      </Container>
    </Wrapper>
  );
}

export default NotificationWidget;

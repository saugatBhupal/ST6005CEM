import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import MarkAllAsReadButton from "./buttons/MarkAllAsReadButton";

const Wrapper = styled.div`
  height: inherit;
  width: 100%;
  background-color: ${Colors.lightSelected};
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  border-top: 1px solid ${Colors.greyOutlineShadow};
`;
const Container = styled.div`
  height: inherit;
  width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;
function NotificationBottomSection() {
  return (
    <Wrapper>
      <Container>
        <MarkAllAsReadButton />
      </Container>
    </Wrapper>
  );
}

export default NotificationBottomSection;

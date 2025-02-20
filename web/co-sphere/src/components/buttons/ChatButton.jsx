import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import MessageIcon from "../icon/MessageIcon";

const Wrapper = styled.div`
  z-index: 99;
`;
const Container = styled.div`
  border-radius: 4px;
  border: 0.5px solid ${Colors.greyOutlineShadow};
  background-color: ${Colors.lightGreen};
  display: flex;
  align-items: center;

  cursor: pointer;
  span {
    font-size: ${FontSize.extraSmall};
    color: ${Colors.deepGreen};
    font-weight: 400;
    margin-top: 2px;
  }
  &:hover {
    border: 0.5px solid #43b643;
  }
  padding: 5px 10px;
`;
const Icon = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 15px !important;
    stroke-width: 0.1px !important;
  }
`;
function ChatButton({ onClick }) {
  return (
    <Wrapper
      onClick={() => {
        onClick();
      }}
    >
      <Container>
        <Icon>
          <MessageIcon />
        </Icon>
        <span>Start Chat</span>
      </Container>
    </Wrapper>
  );
}

export default ChatButton;

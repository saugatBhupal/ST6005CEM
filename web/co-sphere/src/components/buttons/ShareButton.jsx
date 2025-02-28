import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import ShareIcon from "../icon/ShareIcon";

const Wrapper = styled.div`
  cursor: pointer;
`;
const Container = styled.div``;
const Icon = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 4px;
  border: 0.5px solid ${Colors.greyOutlineShadow};
  background-color: ${Colors.chatBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 15px !important;
    strokewidth: 0.1px !important;
    stroke: none;
  }
`;
function ShareButton({ onClick }) {
  return (
    <Wrapper
      onClick={() => {
        onClick && onClick();
      }}
    >
      <Container>
        <Icon>
          <ShareIcon />
        </Icon>
      </Container>
    </Wrapper>
  );
}

export default ShareButton;

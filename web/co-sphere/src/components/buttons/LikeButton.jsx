import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import HeartIcon from "../icon/HeartIcon";

const Wrapper = styled.div``;
const Container = styled.div``;
const Icon = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 4px;
  border: 1px solid ${Colors.greyOutlineShadow};
  background-color: ${Colors.chatBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-top: 3px;
    height: 15px !important;
    strokewidth: 1px !important;
    stroke: ${Colors.fontBlack} !important;
  }
`;
function LikeButton() {
  return (
    <Wrapper>
      <Container>
        <Icon>
          <HeartIcon />
        </Icon>
      </Container>
    </Wrapper>
  );
}

export default LikeButton;

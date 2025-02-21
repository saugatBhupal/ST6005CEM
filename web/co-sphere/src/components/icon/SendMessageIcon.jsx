import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import Icon from "./Icon";

const Wrapper = styled.div`
  cursor: pointer;
  svg {
    stroke: ${Colors.subtitleBlack};
    &:hover {
      stroke: ${Colors.mainBlue};
    }
  }
`;
function SendMessageIcon() {
  return (
    <Wrapper>
      <Icon>
        <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24.4876 12.681L5.74362 12.4246M24.4876 12.681L1.33214 23.4424L5.74362 12.4246M24.4876 12.681L1.63511 1.29038L5.74362 12.4246"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Icon>
    </Wrapper>
  );
}

export default SendMessageIcon;

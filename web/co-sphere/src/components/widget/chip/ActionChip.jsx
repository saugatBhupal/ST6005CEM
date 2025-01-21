import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const Wrapper = styled.div`
  background-color: ${Colors.menuSelected};
  width: fit-content;
  height: 35px;
  display: flex;
  align-items: center;
  font-size: 14px;
  border-radius: 8px;
  transition-duration: 0.1s;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.greyOutlineShadow};
  }
  div {
    padding: 15px !important;
    font-weight: 600 !important;
    letter-spacing: 0.6;
    color: ${Colors.subtitleBlack};
  }
`;
function ActionChip({ title, onClick }) {
  return (
    <Wrapper>
      <div
        onClick={() => {
          onClick();
        }}
      >
        {title}
      </div>
    </Wrapper>
  );
}

export default ActionChip;

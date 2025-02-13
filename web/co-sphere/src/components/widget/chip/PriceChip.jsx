import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";

const Wrapper = styled.div`
  background-color: ${Colors.lightGreen};
  width: fit-content;
  height: 25px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition-duration: 0.1s;
  cursor: pointer;
  div {
    padding: 15px !important;
    font-weight: 500 !important;
    font-size: ${FontSize.extraSmall} !important;
    letter-spacing: 0.6;
    color: ${Colors.deepGreen};
  }
`;
function PriceChip({ min, max }) {
  return (
    <Wrapper>
      <div>
        रु{min} - रु{max}
      </div>
    </Wrapper>
  );
}

export default PriceChip;

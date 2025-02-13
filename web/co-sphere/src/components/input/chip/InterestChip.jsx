import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 10px 20px;
  border-radius: 32px;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? `${Colors.strokeBlue}` : `${Colors.greyBackground}`};
  color: ${({ isSelected }) =>
    isSelected ? `${Colors.backgroundWhite}` : `${Colors.justBlack}`};
`;
function InterestChip(props) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Wrapper
      isSelected={isSelected}
      onClick={() => {
        setIsSelected(!isSelected);
      }}
    >
      {props.text}
    </Wrapper>
  );
}

export default InterestChip;

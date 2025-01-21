import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div``;
const Button = styled.button`
  /* width: 110px; */
  height: 40px;
  width: 80px;
  border: none;
  color: ${Colors.justWhite};
  background-color: ${Colors.strokeBlue};
  /* height: 50px; */
  font-size: 15px;
  border-radius: 30px;
  cursor: pointer;
  transition-duration: 0.1s;

  &:hover {
    background-color: #09267bed;
  }
`;

function TextAreaFilledButton(props) {
  return (
    <Wrapper>
      <Button onClick={() => props.onClick()}>{props.placeholder}</Button>
    </Wrapper>
  );
}

export default TextAreaFilledButton;

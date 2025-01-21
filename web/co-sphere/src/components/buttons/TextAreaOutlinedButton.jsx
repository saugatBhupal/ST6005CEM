import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div``;
const Button = styled.button`
  /* width: 110px; */
  height: 40px;
  width: 80px;
  border: 1.5px solid ${Colors.greyOutline};
  color: ${Colors.subtitleBlack};
  background-color: transparent;
  /* height: 50px; */
  font-size: 15px;
  border-radius: 30px;
  cursor: pointer;
  transition-duration: 0.1s;

  &:hover {
    border-color: #09267bed;
    color: #09267bed;
  }
`;

function TextAreaOutlinedButton(props) {
  return (
    <Wrapper>
      <Button onClick={() => props.onClick()}>{props.placeholder}</Button>
    </Wrapper>
  );
}

export default TextAreaOutlinedButton;

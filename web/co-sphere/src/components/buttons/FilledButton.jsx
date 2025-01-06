import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div``;
const Button = styled.button`
  min-width: 100px;
  width: 100%;
  background-color: ${Colors.strokeBlue};
  color: ${Colors.backgroundWhite};
  height: 50px;
  font-size: 16px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #001b6cee;
  }
`;
function FilledButton(props) {
  return (
    <Wrapper>
      <Button onClick={() => props.onClick()}>{props.placeholder}</Button>
    </Wrapper>
  );
}

export default FilledButton;

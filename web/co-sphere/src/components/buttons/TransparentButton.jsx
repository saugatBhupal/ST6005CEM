import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div``;
const Button = styled.button`
  width: 110px;
  color: ${Colors.strokeBlue};
  background-color: transparent;
  height: 50px;
  font-size: 15px;
  border: none;
  cursor: pointer;
`;
function TransparentButton(props) {
  return (
    <Wrapper>
      <Button onClick={() => props.onClick()}>{props.placeholder}</Button>
    </Wrapper>
  );
}

export default TransparentButton;

import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div``;
const Button = styled.button`
  /* width: 110px; */
  padding: 15px 30px;
  border: 1px solid ${Colors.strokeBlue};
  color: ${Colors.strokeBlue};
  background-color: transparent;
  /* height: 50px; */
  font-size: 15px;
  border-radius: 30px;
  cursor: pointer;
  transition-duration: 0.2s;

  &:hover {
    background-color: ${Colors.mainBlue};
    color: white;
  }
`;
function OutlinedButton(props) {
  return (
    <Wrapper>
      <Button onClick={() => props.onClick()}>{props.placeholder}</Button>
    </Wrapper>
  );
}

export default OutlinedButton;

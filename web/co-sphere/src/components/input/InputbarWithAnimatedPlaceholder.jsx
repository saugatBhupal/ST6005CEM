import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
const Wrapper = styled.div`
  position: relative;
  width: 388px;
`;

const Icon = styled.div`
  position: absolute;
  img {
    height: 20px;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 55px;
  padding: 10px 10px 10px 25px;
  font-size: 16px;
  border: 1px solid ${Colors.greyOutline};
  border-radius: 32px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: transparent;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -8px;
    left: 20px;
    font-size: 12px;
    color: ${Colors.subtitleBlack};
    padding: 0 5px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 18px;
  left: 20px;
  font-size: 16px;
  color: #4c4c4ca8;
  background-color: ${Colors.justWhite};
  font-size: 16px;
  pointer-events: none;
  transition: all 0.3s ease;
`;

function InputbarWithAnimatedPlaceholder(props) {
  return (
    <Wrapper>
      <Icon>{/* <img src={Logo} alt="" /> */}</Icon>
      <Input
        type={props.type ? props.type : "text"}
        placeholder=" "
        id="input-bar"
        {...(props.value && { value: props.value })}
        onChange={() => {}}
      />
      <Label htmlFor="input-bar">{props.placeholder}</Label>
    </Wrapper>
  );
}

export default InputbarWithAnimatedPlaceholder;

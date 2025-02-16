import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div`
  width: 100%;
  background-color: transparent;
  position: relative;
  align-items: center;
  display: flex;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: transparent;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${Colors.justWhite};
  svg {
    background-color: ${Colors.justWhite};
    transition-duration: 0.4s;
    height: 30px;
    stroke: ${Colors.greyOutline};
  }
`;

const InputBox = styled.input`
  background-color: transparent;
  border: none;
  height: 60px;
  width: 100%;
  font-size: ${FontSize.small};
  font-weight: 200;
  color: ${Colors.subtitleBlack};
  padding-left: 50px;
  &:focus {
    outline: none;
  }
  &:hover {
    color: ${Colors.subtitleBlack};
  }
  &:hover::placeholder {
    color: ${Colors.subtitleBlack};
    transition-duration: 0.2s;
  }
  &:hover ~ ${SearchIcon} svg {
    stroke: ${Colors.subtitleBlack};
  }
`;

function BorderlessInputbar({ placeholder, onChange, value }) {
  return (
    <Wrapper>
      <InputWrapper>
        <InputBox
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
        />
      </InputWrapper>
    </Wrapper>
  );
}

export default BorderlessInputbar;

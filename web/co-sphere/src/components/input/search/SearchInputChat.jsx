import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";

const Wrapper = styled.div`
  width: 100%;
  background-color: transparent;
  position: relative;
  align-items: center;
  display: flex;
  height: 49px;
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
    height: 25px;
    stroke: ${Colors.greyOutline};
  }
`;

const InputBox = styled.input`
  background-color: transparent;
  border: none;
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

function SearchInputChat() {
  return (
    <Wrapper>
      <InputWrapper>
        <SearchIcon>
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.8643 18.01L22.3504 22.35M20.9037 10.7767C20.9037 16.3695 16.3699 20.9034 10.7771 20.9034C5.18425 20.9034 0.650391 16.3695 0.650391 10.7767C0.650391 5.18389 5.18425 0.650024 10.7771 0.650024C16.3699 0.650024 20.9037 5.18389 20.9037 10.7767Z"
              strokeLinecap="round"
            />
          </svg>
        </SearchIcon>
        <InputBox placeholder="Search chat" />
      </InputWrapper>
    </Wrapper>
  );
}

export default SearchInputChat;

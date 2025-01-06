import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div`
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    div {
      transform: rotate(0.75turn);
      transform-origin: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    svg {
      height: 40px;
      color: ${Colors.mainBlue};
      stroke-width: 1.5px;
      transition-duration: 0.2s;
      &:hover {
        transform: translateY(-2px);
      }
    }
  }
`;

function BackButton(props) {
  return (
    <Wrapper>
      <button
        onClick={() => {
          props.onClick();
        }}
      >
        <div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.625 11.1667L12 7M12 7L16.375 11.1667M12 7L12 17"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>
    </Wrapper>
  );
}

export default BackButton;

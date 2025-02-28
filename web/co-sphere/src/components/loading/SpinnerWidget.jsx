import React from "react";
import styled, { keyframes } from "styled-components";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div`
  width: fit-content;
  margin: auto;
  padding: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  b {
    font-size: ${FontSize.extraSmall};
    font-weight: 600;
    color: ${Colors.strokeBlue};
  }
`;
const l9_0 = keyframes`
  16.67% {background-size:8px 30%, 8px 30%, 8px 50%, 8px 50%, 8px 50%, 8px 50%}
  33.33% {background-size:8px 30%, 8px 30%, 8px 30%, 8px 30%, 8px 50%, 8px 50%}
  50%    {background-size:8px 30%, 8px 30%, 8px 30%, 8px 30%, 8px 50%, 8px 50%}
  66.67% {background-size:8px 50%, 8px 50%, 8px 30%, 8px 30%, 8px 50%, 8px 50%}
  83.33% {background-size:8px 50%, 8px 50%, 8px 50%, 8px 50%, 8px 50%, 8px 50%}
`;

const l9_1 = keyframes`
  20%     {left:0px}
  40%,70% {left:calc(50% - 4px)}
  80%,85% {left:8px;top:calc(50% - 4px)}
  100%    {left:8px;top:-8px}
`;

const Loader = styled.div`
  width: 40px;
  height: 40px;
  --c: no-repeat linear-gradient(${Colors.strokeBlue} 0 0);
  background: var(--c) 0 0, var(--c) 0 100%, var(--c) 50% 0, var(--c) 50% 100%,
    var(--c) 100% 0, var(--c) 100% 100%;
  background-size: 4px 50%;
  animation: ${l9_0} 1s infinite;
  position: relative;
  overflow: hidden;
  border-radius: 2px;

  &:before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${Colors.strokeBlue};
    top: calc(50% - 4px);
    left: -8px;
    animation: ${l9_1} 1s infinite;
  }
`;

const SpinnerWidget = () => {
  return (
    <Wrapper>
      <Loader />
      <b>Loading.</b>
    </Wrapper>
  );
};

export default SpinnerWidget;

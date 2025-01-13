import React from "react";
import styled, { keyframes } from "styled-components";
import { Colors } from "../../../constants/Colors";

const ProgressbarLoadAnimation = (height) => keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: ${height};
  }
`;
const ProgressBarContainer = styled.div`
  width: 40px;
  height: inherit;
  background-color: #e0e0e0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  z-index: 10 !important;
`;

const Progress = styled.div`
  width: 100%;
  height: ${(props) => (props.current / props.max) * 100}%;
  background-color: ${(props) => props.fillColor || `${Colors.strokeBlue}`};
  position: absolute;
  bottom: 0;
  transition: 0.3s;
  animation: ${ProgressbarLoadAnimation} 0.4s;
`;
const VerticalProgressBar = ({ fillColor, current, max }) => {
  return (
    <ProgressBarContainer>
      <Progress fillColor={fillColor} current={current} max={max} />
    </ProgressBarContainer>
  );
};

export default VerticalProgressBar;

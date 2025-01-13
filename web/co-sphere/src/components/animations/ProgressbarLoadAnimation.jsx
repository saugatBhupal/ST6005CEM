import { css, keyframes } from "styled-components";

const ProgressbarLoadAnimation = keyframes`
  0% {
    height : 0px;
  }
  100% {
    height : 80%;
  }
`;

const Animation = css`
  ${ProgressbarLoadAnimation}
`;

export default Animation;

import { keyframes, css } from 'styled-components';

const floatKeyframes = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const floatAnimation = css`
  ${floatKeyframes}
`;

export default floatAnimation;

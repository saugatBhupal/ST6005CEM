import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div`
  color: ${Colors.subtitleBlack};
  a {
    color: ${Colors.mainBlue};
    font-weight: 400;
    cursor: pointer;
  }
`;
function SignupTextBlock() {
  return (
    <Wrapper>
      Already have an account? <a>Sign in</a>
    </Wrapper>
  );
}

export default SignupTextBlock;

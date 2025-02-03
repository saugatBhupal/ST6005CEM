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
function SigninTextBlock() {
  return (
    <Wrapper>
      Don't have an account? <a href="/signup">Sign up</a>
    </Wrapper>
  );
}

export default SigninTextBlock;

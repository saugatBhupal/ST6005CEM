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
function ResendOtpTextBlock() {
  return (
    <Wrapper>
      Didn't get the code? <a>Resend</a>
    </Wrapper>
  );
}

export default ResendOtpTextBlock;

import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div`
  color: ${Colors.subtitleBlack};
  span {
    color: ${Colors.mainBlue} !important;
    font-weight: 400 !important;
    font-size: ${FontSize.medium}!important;
    cursor: pointer !important;
  }
`;
function ResendOtpTextBlock({ onClick }) {
  const [loading, setLoading] = useState(false);
  return (
    <Wrapper>
      Didn't get the code?{" "}
      <span
        onClick={async () => {
          setLoading(true);
          try {
            await onClick();
          } catch (error) {
            console.error("Error during OTP resend:", error);
          } finally {
            setLoading(false);
          }
        }}
      >
        {loading ? "Resending" : "Resend"}
      </span>
    </Wrapper>
  );
}

export default ResendOtpTextBlock;

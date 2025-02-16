import React from "react";
import styled from "styled-components";
import SendMessageIcon from "../icon/SendMessageIcon";

const Wrapper = styled.div``;
function SendMessageButton({ onClick }) {
  return (
    <Wrapper
      onClick={() => {
        onClick();
      }}
    >
      <SendMessageIcon />
    </Wrapper>
  );
}

export default SendMessageButton;

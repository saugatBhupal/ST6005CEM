import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100px;
  width: 100px;
  z-index: 1;
  background-color: red;
  position: absolute;
`;
function Toast() {
  return <Wrapper>Toast</Wrapper>;
}

export default Toast;

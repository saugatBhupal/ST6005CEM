import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import CancelIcon from "../icon/CancelIcon";

const Wrapper = styled.div``;
const Container = styled.div`
  cursor: pointer;
  height: 30px;
  width: 30px;
  background-color: ${Colors.lightRed};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: 1px solid ${Colors.deepRed};
  svg {
    margin-top: 4px;
  }
`;
function CancelButtonRound({ onClick }) {
  return (
    <Wrapper
      onClick={(e) => {
        onClick && onClick(e);
      }}
    >
      <Container>
        <CancelIcon />
      </Container>
    </Wrapper>
  );
}

export default CancelButtonRound;

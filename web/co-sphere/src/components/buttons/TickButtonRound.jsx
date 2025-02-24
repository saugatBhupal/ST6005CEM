import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import TickIcon from "../icon/TickIcon";

const Wrapper = styled.div``;
const Container = styled.div`
  cursor: pointer;
  height: 30px;
  width: 30px;
  background-color: ${Colors.lightGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: 1px solid ${Colors.deepGreen};
  svg {
    margin-top: 3px;
  }
`;
function TickButtonRound({ onClick }) {
  return (
    <Wrapper
      onClick={(e) => {
        onClick && onClick(e);
      }}
    >
      <Container>
        <TickIcon />
      </Container>
    </Wrapper>
  );
}

export default TickButtonRound;

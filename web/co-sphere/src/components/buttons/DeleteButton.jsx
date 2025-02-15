import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import DeleteIcon from "../icon/DeleteIcon";

const Wrapper = styled.div``;
const Container = styled.div``;
const Icon = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 4px;
  border: 0.5px solid ${Colors.deepRed};
  background-color: ${Colors.chatBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.lightRed};
  svg {
    margin-top: 2px;
    height: 20px !important;
    stroke-width: 1px !important;
    stroke: none;
  }
`;
function DeleteButton() {
  return (
    <Wrapper>
      <Container>
        <Icon>
          <DeleteIcon />
        </Icon>
      </Container>
    </Wrapper>
  );
}

export default DeleteButton;

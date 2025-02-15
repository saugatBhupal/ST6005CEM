import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import EditIcon from "../icon/EditIcon";

const Wrapper = styled.div``;
const Container = styled.div`
  border-radius: 4px;
  border: 0.5px solid ${Colors.greyOutlineShadow};
  background-color: ${Colors.chatBackground};
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    font-size: ${FontSize.extraSmall};
    font-weight: 400;
  }
  &:hover {
    background-color: ${Colors.menuSelected};
  }
  padding: 2px 5px;
`;
const Icon = styled.div`
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 15px !important;
    stroke-width: 0.1px !important;
    stroke: none;
  }
`;
function EditJobDetailsButton() {
  return (
    <Wrapper>
      <Container>
        <Icon>
          <EditIcon />
        </Icon>
        <span>Edit Details</span>
      </Container>
    </Wrapper>
  );
}

export default EditJobDetailsButton;

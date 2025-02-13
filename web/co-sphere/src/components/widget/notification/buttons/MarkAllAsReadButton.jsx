import React from "react";
import styled from "styled-components";
import { Colors } from "../../../../constants/Colors";
import { FontSize } from "../../../../constants/FontSize";
import MarkAsReadIcon from "../../../icon/MarkAsReadIcon";

const Wrapper = styled.div`
  width: 120px;
  height: 30px;
`;
const Container = styled.div`
  width: inherit;
  height: inherit;
  background-color: ${Colors.justWhite};
  border: 1px solid ${Colors.greyOutlineShadow};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.menuSelected};
  }
`;
const Icon = styled.div``;
const Text = styled.div`
  font-weight: 400;
  font-size: ${FontSize.small};
  color: ${Colors.subtitleBlack};
`;
function MarkAllAsReadButton() {
  return (
    <Wrapper>
      <Container>
        <Icon>
          <MarkAsReadIcon />
        </Icon>
        <Text> Mark all as read</Text>
      </Container>
    </Wrapper>
  );
}

export default MarkAllAsReadButton;

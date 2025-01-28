import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div`
  margin-left: 50px;
  margin-right: 20px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: ${FontSize.small};
  font-weight: 500;
`;
const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: ${FontSize.extraSmall};
  font-weight: 500;
  color: ${Colors.subtitleBlack};
  cursor: pointer;
  transition-duration: 0.2s;
  &:hover {
    transform: translate(2px);
  }
`;

function BasicWidgetTitleBlock({ title, onClick }) {
  return (
    <Wrapper>
      <Flex>
        <Title>{title}</Title>
        <Button
          onClick={() => {
            onClick();
          }}
        >
          View all
        </Button>
      </Flex>
    </Wrapper>
  );
}

export default BasicWidgetTitleBlock;

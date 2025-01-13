import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div`
  margin-left: 50px;
  margin-right: 20px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 15px;
  font-weight: 500;
`;
const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: 13px;
  font-weight: 600;
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

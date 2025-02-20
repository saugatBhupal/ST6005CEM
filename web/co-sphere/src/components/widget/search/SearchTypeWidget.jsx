import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  border: 0.5px solid ${Colors.greyOutlineShadow};
  cursor: pointer;
`;
const Container = styled.div`
  height: inherit;
  width: calc(100% - 4px);
  border-right: ${({ selected }) =>
    !selected ? ` 4px solid transparent` : `4px solid ${Colors.mainBlue}`};
  background-color: ${({ selected }) =>
    !selected ? `transparent` : `${Colors.menuSelected}`};
  &:hover {
    background-color: ${Colors.menuSelected};
  }
`;

const Flex = styled.div`
  height: 100%;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: ${FontSize.small};
    color: ${Colors.justWhite};
    font-weight: 600;
    background-color: ${Colors.mainBlue};
    padding: 5px 10px;
    border-radius: 36px;
  }
`;

const Name = styled.div`
  font-weight: 400;
  margin-left: 5px;
  font-size: ${FontSize.medium};
`;

function SearchTypeWidget({ type, query, onClick, selected }) {
  return (
    <Wrapper
      onClick={() => {
        onClick();
      }}
    >
      <Container selected={selected}>
        <Flex>
          <Name>{type}</Name>
          <span>12 </span>
        </Flex>
      </Container>
    </Wrapper>
  );
}

export default SearchTypeWidget;

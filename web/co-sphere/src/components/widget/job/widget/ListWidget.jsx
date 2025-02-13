import React from "react";
import styled from "styled-components";
import { Colors } from "../../../../constants/Colors";
import { FontSize } from "../../../../constants/FontSize";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Title = styled.div`
  font-weight: 400;
  font-size: ${FontSize.medium};
`;
const Description = styled.div`
  font-weight: 200;
  font-size: ${FontSize.medium};
  color: ${Colors.subtitleBlack};
  ul {
    padding-left: 15px;
    li::marker {
      color: ${Colors.justBlack};
    }
    li {
      margin-bottom: 10px;
      font-weight: 200;
      font-size: ${FontSize.medium};
      color: ${Colors.subtitleBlack};
    }
  }
`;
function ListWidget({ title, list }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Description>
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Description>
    </Wrapper>
  );
}

export default ListWidget;

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
`;
function DescriptionWidget({ title, description }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
}

export default DescriptionWidget;

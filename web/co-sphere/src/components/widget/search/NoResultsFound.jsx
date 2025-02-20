import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  font-size: ${FontSize.mediumLarge};
  text-align: center;
  color: ${Colors.greyOutline};
`;
const Content = styled.div`
  height: calc(100% - 80px);
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.div`
  height: 100px;
  width: 100px;
  svg {
    height: 100% !important;
    width: 100% !important;
    stroke: ${Colors.greyOutline} !important;
  }
`;
function NoResultsFound({ query, type }) {
  return (
    <Wrapper>
      <Content>
        <Icon></Icon>
        No {type}s named {query}
        <br />
      </Content>
    </Wrapper>
  );
}

export default NoResultsFound;

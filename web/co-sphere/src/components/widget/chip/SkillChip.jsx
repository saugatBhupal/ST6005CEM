import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const Wrapper = styled.div`
  background-color: ${Colors.lightMainBlue};
  width: fit-content;
  height: 35px;
  display: flex;
  align-items: center;
  font-size: 14px;
  border-radius: 8px;
  div {
    padding: 15px !important;
    font-weight: 600 !important;
    letter-spacing: 0.6;
    color: ${Colors.mainBlue};
  }
`;
function SkillChip({ title }) {
  return (
    <Wrapper>
      <div>{title}</div>
    </Wrapper>
  );
}

export default SkillChip;

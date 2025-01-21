import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const Wrapper = styled.div`
  font-size: 12px;
  background-color: ${Colors.greyOutlineShadow};
  height: 30px;
  width: 146px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  box-shadow: 1px 5px 40px -10px rgba(0, 0, 0, 0.191);
  div {
    width: 146px;
    text-align: center;
  }
  b {
    font-weight: 500;
    color: ${Colors.mainBlue};
  }
`;

function SuccesssChip({ percent }) {
  return (
    <Wrapper>
      <div>
        <b>{percent}</b> Job Success
      </div>
    </Wrapper>
  );
}

export default SuccesssChip;

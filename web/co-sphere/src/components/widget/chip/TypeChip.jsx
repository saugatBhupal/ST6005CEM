import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 60px;
  height: 25px;
  font-weight: 500;
  font-size: 12px;
  background-color: ${(props) =>
    props.type === "Pending"
      ? "#DFAB7620"
      : props.type === "Active"
      ? "#76DFAE20"
      : "#e0e0e0"};
  color: ${(props) =>
    props.type === "Pending"
      ? "#E3984E"
      : props.type === "Active"
      ? "#0D6722"
      : "#000000"};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

function TypeChip({ type }) {
  return <Wrapper type={type}>{type}</Wrapper>;
}

export default TypeChip;

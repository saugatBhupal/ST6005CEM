import React from "react";
import styled from "styled-components";
import { FontSize } from "../../../constants/FontSize";

const Wrapper = styled.div`
  width: 60px;
  height: 25px;
  font-weight: 500;
  font-size: ${FontSize.extraSmall} !important;
  background-color: ${(props) =>
    props.type === "Pending" || props.type === "Delayed"
      ? "#DFAB7620"
      : props.type === "Active" ||
        props.type === "Junior" ||
        props.type === "On-Time"
      ? "#76DFAE20"
      : "#e0e0e0"};
  color: ${(props) =>
    props.type === "Pending" || props.type === "Delayed"
      ? "#E3984E"
      : props.type === "Active" ||
        props.type === "Junior" ||
        props.type === "On-Time"
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

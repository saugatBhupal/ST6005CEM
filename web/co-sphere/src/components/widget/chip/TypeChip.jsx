import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";

const Wrapper = styled.div`
  width: 60px;
  height: 25px;
  font-weight: 500;
  font-size: ${FontSize.extraSmall} !important;
  background-color: ${(props) =>
    props.type === "Pending" ||
    props.type === "Delayed" ||
    props.type === "Hiring"
      ? "#DFAB7620"
      : props.type === "Active" ||
        props.type === "Junior" ||
        props.type === "On-Time" ||
        props.type === "Job"
      ? "#76DFAE20"
      : `${Colors.lightMainBlue}`};
  color: ${(props) =>
    props.type === "Pending" ||
    props.type === "Delayed" ||
    props.type === "Hiring"
      ? "#E3984E"
      : props.type === "Active" ||
        props.type === "Junior" ||
        props.type === "On-Time" ||
        props.type === "Job"
      ? "#0D6722"
      : `${Colors.mainBlue}`};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

function TypeChip({ type }) {
  return <Wrapper type={type}>{type}</Wrapper>;
}

export default TypeChip;

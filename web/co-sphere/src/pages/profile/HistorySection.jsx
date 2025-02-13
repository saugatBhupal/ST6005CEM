import React from "react";
import styled from "styled-components";
import TaskCard from "../../components/widget/task/TaskCard";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div``;
const Title = styled.div`
  font-size: ${FontSize.small};
  font-weight: 500;
  color: ${Colors.subtitleBlack};
  margin-bottom: 10px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
function HistorySection() {
  return (
    <Wrapper>
      <Title>Co-Sphere History</Title>
      <Column>
        <TaskCard type="Delayed" />
        <TaskCard type="On-Time" />
        <TaskCard type="Delayed" />
        <TaskCard type="Delayed" />
        <TaskCard type="Delayed" />
      </Column>
    </Wrapper>
  );
}

export default HistorySection;

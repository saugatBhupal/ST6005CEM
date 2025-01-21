import React from "react";
import styled from "styled-components";
import TaskCard from "../../components/widget/task/TaskCard";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div``;
const Title = styled.div`
  font-size: 16px;
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

import React from "react";
import styled from "styled-components";
import EducationCard from "../../components/widget/education/EducationCard";
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
function EducationSection() {
  const isUser = true;
  return (
    <Wrapper>
      <Title>Education</Title>
      <Column>
        <EducationCard />
        <EducationCard />
        <EducationCard />
        <EducationCard />
        <EducationCard />
        <EducationCard />
      </Column>
    </Wrapper>
  );
}

export default EducationSection;

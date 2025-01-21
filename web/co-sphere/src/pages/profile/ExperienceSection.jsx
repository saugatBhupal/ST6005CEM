import React from "react";
import styled from "styled-components";
import TextAreaWithActions from "../../components/input/textarea/TextAreaWithActions";
import ExperienceCard from "../../components/widget/experience/ExperienceCard";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div``;
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${Colors.subtitleBlack};
  margin-bottom: 10px;
`;
const Description = styled.div`
  font-size: 16px;
  color: ${Colors.subtitleBlack};
  margin: 10px auto;
`;
const Margin = styled.div`
  margin: 40px auto;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
function ExperienceSection() {
  const isUser = true;
  return (
    <Wrapper>
      <Title>Professional Overview</Title>
      {isUser ? (
        <TextAreaWithActions
          placeholder="Write a summary of your work experience..."
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          viverra pharetra ligula, nec mattis quam porta vitae. Nullam a congue
          neque, nec volutpat justo."
        />
      ) : (
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          viverra pharetra ligula, nec mattis quam porta vitae. Nullam a congue
          neque, nec volutpat justo.
        </Description>
      )}

      <Margin />
      <Title>Experience</Title>
      <Column>
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </Column>
    </Wrapper>
  );
}

export default ExperienceSection;

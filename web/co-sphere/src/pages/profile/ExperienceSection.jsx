import React from "react";
import styled from "styled-components";
import TextAreaWithActions from "../../components/input/textarea/TextAreaWithActions";
import ActionChip from "../../components/widget/chip/ActionChip";
import ExperienceCard from "../../components/widget/experience/ExperienceCard";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div``;
const Title = styled.div`
  font-size: ${FontSize.small};
  font-weight: 500;
  color: ${Colors.justBlack};
  margin-bottom: 10px;
`;
const Description = styled.div`
  font-size: ${FontSize.small};
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
const Center = styled.div`
  width: fit-content;
  margin: 10px auto;
`;
function ExperienceSection({ setOverlay, setOverlayWidget, user, isUser }) {
  return (
    <Wrapper>
      <Title>Professional Overview</Title>
      {isUser ? (
        <TextAreaWithActions
          placeholder="Write a summary of your work experience..."
          value={user.overview}
        />
      ) : (
        <Description>
          {user.overview || "User has not added this information."}
        </Description>
      )}

      <Margin />
      <Title>Experience</Title>
      <Column>
        {user.experience &&
          user.experience.map((experience, key) => <ExperienceCard />)}
        <Center>
          {isUser && (
            <ActionChip
              title={"Add More"}
              onClick={() => {
                setOverlay(true);
                setOverlayWidget();
              }}
            />
          )}
        </Center>
      </Column>
    </Wrapper>
  );
}

export default ExperienceSection;

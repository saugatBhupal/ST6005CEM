import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useToast } from "../../common/manager/contextManager/ToastContextManager";
import { manageGetExperienceByUserId } from "../../common/manager/userManager/UserManager";
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
  const [experience, setExperience] = useState();
  const { showToast } = useToast();
  useEffect(() => {
    async function getExperience() {
      await manageGetExperienceByUserId(
        user._id,
        (experience) => setExperience(experience),
        (err) => {
          showToast(err);
          setExperience(null);
        }
      );
    }
    getExperience();
  }, []);
  return (
    <Wrapper>
      {showToast(isUser)}
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
        {experience &&
          experience.map((experience, key) => (
            <ExperienceCard experience={experience} key={key} />
          ))}
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

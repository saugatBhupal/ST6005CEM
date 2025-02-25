import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useToast } from "../../common/manager/contextManager/ToastContextManager";
import { manageGetEducationByUserId } from "../../common/manager/userManager/UserManager";
import ActionChip from "../../components/widget/chip/ActionChip";
import EducationCard from "../../components/widget/education/EducationCard";
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
const Center = styled.div`
  width: fit-content;
  margin: 10px auto;
`;
function EducationSection({
  setOverlay,
  setOverlayWidget,
  user,
  isUser,
  reload,
}) {
  const [education, setEducation] = useState();
  const { showToast } = useToast();
  useEffect(() => {
    async function getEducation() {
      await manageGetEducationByUserId(
        user._id,
        (education) => setEducation(education),
        (err) => {
          showToast(err);
          setEducation(null);
        }
      );
    }
    getEducation();
  }, [reload]);
  return (
    <Wrapper>
      <Title>Education</Title>
      <Column>
        {education &&
          education.map((education) => <EducationCard education={education} />)}
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

export default EducationSection;

import React from "react";
import styled from "styled-components";
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
function EducationSection({ setOverlay, setOverlayWidget }) {
  return (
    <Wrapper>
      <Title>Education</Title>
      <Column>
        <EducationCard />
        <EducationCard />
        <Center>
          <ActionChip
            title={"Add More"}
            onClick={() => {
              setOverlay(true);
              setOverlayWidget();
            }}
          />
        </Center>
      </Column>
    </Wrapper>
  );
}

export default EducationSection;

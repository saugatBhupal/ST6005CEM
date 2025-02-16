import React from "react";
import styled from "styled-components";
import DateInput from "../../components/input/DateInput";
import CustomDropDown from "../../components/input/dropdown/CustomDropDown";
import TextAreaWithWordCount from "../../components/input/textarea/TextAreaWithWordCount";
import SelectedApplicantProfileWidget from "../../components/widget/profile/SelectedApplicantWidget";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
`;
const Title = styled.div`
  font-size: ${FontSize.medium};
  font-weight: 500;
  color: ${Colors.justBlack};
`;
const Box = styled.div`
  width: 160px;
  input {
    border: 0.5px solid ${Colors.greyOutlineShadow};
  }
`;

function EditTaskDetails() {
  return (
    <Wrapper>
      <Container>
        <Title>Create a new task</Title>
        <div>
          <TextAreaWithWordCount placeholder={"Please enter the task name"} />
        </div>
        <div>
          <TextAreaWithWordCount
            placeholder={"Provide a detailed task description"}
          />
        </div>
        <Box>
          <DateInput placeholder={"Task Deadline"} />
        </Box>
        <CustomDropDown
          label={"Select members to assign the task"}
          items={[<SelectedApplicantProfileWidget name={"Saugat Singh"} />]}
        />
      </Container>
    </Wrapper>
  );
}

export default EditTaskDetails;

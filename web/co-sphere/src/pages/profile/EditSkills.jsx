import React from "react";
import styled from "styled-components";
import FilledButton from "../../components/buttons/FilledButton";
import InputBarWithAnimatedPlaceholder from "../../components/input/InputbarWithAnimatedPlaceholder";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div`
  height: 100%;
  padding: 20px;
  z-index: 1;
`;
const Container = styled.div`
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;
const Title = styled.div`
  color: ${Colors.subtitleBlack};
  margin-bottom: 15px;
`;

const Button = styled.div`
  width: 200px;
`;
function EditSkills() {
  return (
    <Wrapper>
      <Container>
        <Title>Add Skills To Your Resume</Title>
        <InputBarWithAnimatedPlaceholder
          placeholder="What did you learn today?"
          //   value="Enter Skill to add"
          type="text"
          onChange={() => {
          }}
        />

        <Button>
          <FilledButton
            placeholder={"Save"}
            onClick={() => {
              alert("Saved");
            }}
          />
        </Button>
      </Container>
    </Wrapper>
  );
}

export default EditSkills;

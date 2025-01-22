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
function EditLinks() {
  return (
    <Wrapper>
      <Container>
        <Title>Add Links To Your Profile</Title>
        <InputBarWithAnimatedPlaceholder
          placeholder="Name"
          value="John Cena"
          type="text"
          onChange={() => {}}
        />
        <InputBarWithAnimatedPlaceholder
          placeholder="LinkedIn"
          value="www.linkedin.com"
          type="text"
          onChange={() => {}}
        />
        <InputBarWithAnimatedPlaceholder placeholder="Website" type="text" />
        <InputBarWithAnimatedPlaceholder
          placeholder="Instagram"
          type="text"
          onChange={() => {}}
        />
        <Button>
          <FilledButton placeholder={"Save"} onClick={() => {}} />
        </Button>
      </Container>
    </Wrapper>
  );
}

export default EditLinks;

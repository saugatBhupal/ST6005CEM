import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { getFirstLetter } from "../../../utils/GetFirstWord";
import FilledButton from "../../buttons/FilledButton";
import GenerateProfileIconFromWord from "../../icon/GenerateProfileIconFromWord";
import DateInput from "../../input/DateInput";
import InputbarWithAnimatedPlaceholder from "../../input/InputbarWithAnimatedPlaceholder";

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
  width: 100%;
  margin: auto;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
`;
const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  input {
    width: 180px;
  }
`;
const Left = styled.div`
  margin: auto;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function EditEducation() {
  const [institutionName, setinstitutionName] = useState("");

  return (
    <Wrapper>
      <Container>
        <Title>Add A New Degree</Title>
        <Flex>
          <Left>
            <GenerateProfileIconFromWord
              name={getFirstLetter(institutionName)}
            />
          </Left>
          <Right>
            <InputbarWithAnimatedPlaceholder
              placeholder="Institution Name"
              type="text"
              value={institutionName}
              onChange={(value) => setinstitutionName(value)}
            />
            <InputbarWithAnimatedPlaceholder
              placeholder="Education Level"
              value=""
              type="text"
            />
            <Row>
              <DateInput placeholder={"Start"} />
              <DateInput placeholder={"End"} />
            </Row>

            <Button>
              <FilledButton
                placeholder={"Save"}
                onClick={() => alert("Saved")}
              />
            </Button>
          </Right>
        </Flex>
      </Container>
    </Wrapper>
  );
}

export default EditEducation;

import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { getFirstLetter } from "../../../utils/GetFirstWord";
import FilledButton from "../../buttons/FilledButton";
import GenerateProfileIconFromWord from "../../icon/GenerateProfileIconFromWord";
import DateInput from "../../input/DateInput";
import InputbarWithAnimatedPlaceholder from "../../input/InputbarWithAnimatedPlaceholder";
import CustomDropDown from "../../input/dropdown/CustomDropDown";

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

function EditExperience() {
  const [companyName, setCompanyName] = useState("");

  return (
    <Wrapper>
      <Container>
        <Title>Add A New Experience</Title>
        <Flex>
          <Left>
            <GenerateProfileIconFromWord name={getFirstLetter(companyName)} />
          </Left>
          <Right>
            <InputbarWithAnimatedPlaceholder
              placeholder="Company Name"
              type="text"
              value={companyName}
              onChange={(value) => setCompanyName(value)}
            />
            <InputbarWithAnimatedPlaceholder
              placeholder="Position Held"
              value=""
              type="text"
            />
            <CustomDropDown
              items={["Senior", "Mid", "Junior", "Assoc.", "Intern"]}
              placeholder="Role Level"
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

export default EditExperience;

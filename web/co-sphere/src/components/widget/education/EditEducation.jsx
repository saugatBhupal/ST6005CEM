import React, { useState } from "react";
import styled from "styled-components";
import { useToast } from "../../../common/manager/contextManager/ToastContextManager";
import { manageAddEducation } from "../../../common/manager/userManager/UserManager";
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

function EditEducation({ userId, setReload }) {
  const [institutionName, setinstitutionName] = useState("");
  const [degree, setDegree] = useState("");
  const { showToast } = useToast();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  async function handleSubmit() {
    if (!institutionName.trim()) {
      showToast("Position Name is required.");
      return;
    }
    if (!degree || degree.trim() === "") {
      showToast("Role is required.");
      return;
    }
    if (!from) {
      showToast("Start date (From) is required.");
      return;
    }
    if (from && to && new Date(from) > new Date(to)) {
      showToast("Start date cannot be later than the end date.");
      return;
    }
    const details = {
      userID: userId,
      degree: degree,
      organization: institutionName,
      from: from,
      to: to,
    };

    await manageAddEducation(
      details,
      () => {
        showToast("Added new Education History");
        setReload(Math.random());
      },
      (err) => {
        showToast(err);
      }
    );
  }
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
              value={degree}
              type="text"
              onChange={(value) => setDegree(value)}
            />
            <Row>
              <DateInput
                placeholder={"Start"}
                onChange={(val) => {
                  setFrom(val);
                }}
              />
              <DateInput
                placeholder={"End"}
                onChange={(val) => {
                  setTo(val);
                }}
              />
            </Row>

            <Button>
              <FilledButton
                placeholder={"Save"}
                onClick={() => handleSubmit()}
              />
            </Button>
          </Right>
        </Flex>
      </Container>
    </Wrapper>
  );
}

export default EditEducation;

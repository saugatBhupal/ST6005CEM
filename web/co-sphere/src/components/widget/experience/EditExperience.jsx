import React, { useState } from "react";
import styled from "styled-components";
import { useToast } from "../../../common/manager/contextManager/ToastContextManager";
import { manageAddExperience } from "../../../common/manager/userManager/UserManager";
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

function EditExperience({ userId, setReload }) {
  const [companyName, setCompanyName] = useState("");
  const [positionName, setPositionName] = useState("");
  const { showToast } = useToast();
  const [role, setRole] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  async function handleSubmit() {
    if (!positionName.trim()) {
      showToast("Position Name is required.");
      return;
    }
    if (!role || role.trim() === "") {
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
      position: positionName,
      status: role,
      organization: companyName,
      from: from,
      to: to,
    };

    await manageAddExperience(
      details,
      () => {
        showToast("Added new Experience");
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
              value={positionName}
              type="text"
              onChange={(value) => setPositionName(value)}
            />
            <CustomDropDown
              items={["Senior", "Mid", "Junior", "Assoc.", "Intern"]}
              placeholder="Role Level"
              type="text"
              onChange={(role) => {
                setRole(role);
              }}
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

export default EditExperience;

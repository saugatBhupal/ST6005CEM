import React, { useState } from "react";
import styled from "styled-components";
import CustomDropDown from "../../components/input/dropdown/CustomDropDown";
import SquareBorderInputBar from "../../components/input/SquareBorderInputBar";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: calc(100% - 80px);
  height: calc(100% - 20px);
  border: 0.2px solid ${Colors.greyOutlineShadow};
  background-color: ${Colors.justWhite};
`;
const Title = styled.div`
  text-align: center;
  font-size: ${FontSize.large};
  font-weight: 400;
  padding: 40px;
`;
const Form = styled.form`
  padding: 0px 80px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
function CreateSection() {
  const [projectName, setProjectName] = useState();
  return (
    <Wrapper>
      <Container>
        <Title>Create A New Project</Title>
        <Form>
          <SquareBorderInputBar
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => {
              setProjectName(e);
            }}
          />
          <Flex>
            <div style={{ width: "350px" }}>
              <SquareBorderInputBar
                placeholder="Company Name (Optional)"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e);
                }}
              />
            </div>
            <div style={{ width: "350px" }}>
              <CustomDropDown
                items={["Senior", ""]}
                placeholder={"Pick job level"}
              />
            </div>
            <div style={{ width: "350px" }}>
              <CustomDropDown
                items={["On-Site", "Hybrid", "Remote"]}
                placeholder={"Pick job type"}
              />
            </div>
          </Flex>

          <Flex>
            <div style={{ width: "350px" }}>
              <SquareBorderInputBar
                placeholder="Address"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e);
                }}
              />
            </div>
            <div style={{ width: "350px" }}>
              <SquareBorderInputBar
                placeholder="Salary/Budget (Min)"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e);
                }}
              />
            </div>
            <div style={{ width: "350px" }}>
              <SquareBorderInputBar
                placeholder="Salary/Budget (Max)"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e);
                }}
              />
            </div>
          </Flex>
        </Form>
      </Container>
    </Wrapper>
  );
}

export default CreateSection;

import React from "react";
import styled from "styled-components";
import MyApplicationWidget from "../../components/widget/application/MyApplicationWidget";
import JobDetails from "../../components/widget/job/JobDetails";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import SplitLayout from "../common/SplitLayout";

const LeftWrapper = styled.div``;
const LeftContainer = styled.div`
  padding: 20px;
`;
const RightWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${Colors.justWhite};
`;
const Title = styled.div`
  font-size: ${FontSize.small};
  font-weight: 500;
  margin-left: 22px;
`;
function MyApplicationsPage() {
  return (
    <SplitLayout
      left={
        <>
          <LeftWrapper>
            <LeftContainer>
              <Title>My Application</Title>
              <MyApplicationWidget status={"Pending"} />
              <MyApplicationWidget status={"Active"} />
              <MyApplicationWidget status={"Pending"} />
              <MyApplicationWidget status={"Active"} />
              <MyApplicationWidget status={"Pending"} />
              <MyApplicationWidget status={"Active"} />
              <MyApplicationWidget status={"Pending"} />
              <MyApplicationWidget status={"Active"} />
            </LeftContainer>
          </LeftWrapper>
        </>
      }
      right={
        <>
          <RightWrapper>
            <JobDetails />
          </RightWrapper>
        </>
      }
    />
  );
}

export default MyApplicationsPage;

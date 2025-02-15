import React from "react";
import styled from "styled-components";
import JobDetails from "../../components/widget/job/JobDetails";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import SplitLayout from "../common/SplitLayout";
import TabbedPanel from "./TabbedPanel";
import HiringDetails from "./HiringTaskDetails";

const LeftWrapper = styled.div`
  height: inherit;
`;
const LeftContainer = styled.div`
  padding: 20px;
  padding-bottom: 0px;
  height: calc(100% - 20px);
  overflow-y: hidden;
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
function CreatedByMePage() {
  return (
    <SplitLayout
      left={
        <>
          <LeftWrapper>
            <LeftContainer>
              <Title>Created By Me</Title>
              <TabbedPanel />
            </LeftContainer>
          </LeftWrapper>
        </>
      }
      right={
        <>
          <RightWrapper>
            <HiringDetails />
          </RightWrapper>
        </>
      }
      page={"my applications"}
    />
  );
}

export default CreatedByMePage;

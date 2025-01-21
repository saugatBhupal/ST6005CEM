import React from "react";
import styled from "styled-components";
import MenubarDashboard from "../../components/menubar/MenubarDashboard";
import SideMenuBarDesktop from "../../components/menubar/sideMenuBar/SideMenuBarDesktop";
import MenubarSpacerDashboard from "../../components/spacer/MenubarSpacerDashboard";
import BasicWidgetTitleBlock from "../../components/textBlocks/BasicWidgetTitleBlock";
import ApplicationsCreatedByMeWidget from "../../components/widget/application/ApplicationsCreatedByMeWidget";
import MyApplicationWidget from "../../components/widget/application/MyApplicationWidget";
import StatsListWidget from "../../components/widget/stats/StatsListWidget";
import StatsWidget from "../../components/widget/stats/StatsWidget";
import TasksAssignedToMeWidget from "../../components/widget/task/TasksAssignedToMeWidget";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  background-color: ${Colors.backgroundWhite};
`;
const Container = styled.div`
  margin-left: 300px;
  width: calc(100vw - 300px);
`;
const Flex = styled.div`
  margin-top: 20px;
  display: flex;
  height: 100%;
  width: fit-content;
  /* margin: auto; */
`;
const Right = styled.div`
  width: 500px;
  height: 100%;
  overflow-y: scroll;
`;
const MyApplications = styled.div``;
const Left = styled.div`
  height: 100%;
  overflow-y: scroll;
`;
const Body = styled.div`
  overflow: hidden;
  height: calc(100vh - 110px);
`;
const Gap = styled.div`
  height: 40px;
`;
function DashboardPage() {
  return (
    <Wrapper>
      <SideMenuBarDesktop current={"home"} />
      <Container>
        <MenubarDashboard />
        <MenubarSpacerDashboard />
        <Body>
          <Flex>
            <Left>
              <Gap />
              <StatsWidget />
              <StatsListWidget />
              <Gap />
              <MyApplications>
                <BasicWidgetTitleBlock
                  title={"My Applications"}
                  onClick={() => {}}
                />
                <MyApplicationWidget status={"Pending"} />
                <MyApplicationWidget status={"Active"} />
                <MyApplicationWidget status={"Active"} />
                <MyApplicationWidget status={"Active"} />
                <MyApplicationWidget status={"Pending"} />
                <Gap />
              </MyApplications>
            </Left>
            <Right>
              <Gap />
              <BasicWidgetTitleBlock
                title={"Created By Me"}
                onClick={() => {}}
              />
              <ApplicationsCreatedByMeWidget />
              <ApplicationsCreatedByMeWidget />
              <ApplicationsCreatedByMeWidget />
              <Gap />
              <BasicWidgetTitleBlock
                title={"Assigned To Me"}
                onClick={() => {}}
              />
              <TasksAssignedToMeWidget />
              <TasksAssignedToMeWidget />
              <TasksAssignedToMeWidget />
              <TasksAssignedToMeWidget />
              <TasksAssignedToMeWidget />
              <TasksAssignedToMeWidget />
              <Gap />
            </Right>
          </Flex>
        </Body>
      </Container>
    </Wrapper>
  );
}

export default DashboardPage;

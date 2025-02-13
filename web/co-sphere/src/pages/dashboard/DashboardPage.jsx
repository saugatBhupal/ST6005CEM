import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenubarDashboard from "../../components/menubar/MenubarDashboard";
import SideMenuBarDesktop from "../../components/menubar/sideMenuBar/SideMenuBarDesktop";
import MenubarSpacerDashboard from "../../components/spacer/MenubarSpacerDashboard";
import BasicWidgetTitleBlock from "../../components/textBlocks/BasicWidgetTitleBlock";
import ApplicationsCreatedByMeWidget from "../../components/widget/application/ApplicationsCreatedByMeWidget";
import MyApplicationWidget from "../../components/widget/application/MyApplicationWidget";
import NotificationWidget from "../../components/widget/notification/NotificationWidget";
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
  margin-left: 220px;
  width: calc(100vw - 220px);
`;
const Margin = styled.div`
  margin: auto 10px;
`;
const Flex = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  gap: 10px;
  /* margin: auto; */
`;
const Right = styled.div`
  width: 400px;
  max-width: 500px;
  flex: 1 1 0;
  height: 100%;
  overflow-y: scroll;
`;
const MyApplications = styled.div``;
const Left = styled.div`
  height: 100%;
  flex: 1 1 0;
  max-width: 420px;
  overflow-y: scroll;
`;
const Notification = styled.div`
  height: 100%;
  min-width: 300px;
  max-width: 500px;
  flex: 1 1 0;
  margin-top: 40px;
  overflow-y: scroll;
`;
const Body = styled.div`
  overflow: hidden;
  height: calc(100vh - 100px);
`;
const Gap = styled.div`
  height: 30px;
`;
function DashboardPage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <SideMenuBarDesktop current={"home"} />
      <Container>
        <MenubarDashboard />
        <MenubarSpacerDashboard />
        <Margin>
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
                    onClick={() => {
                      navigate("/my-applications");
                    }}
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
              <Notification>
                <NotificationWidget />
              </Notification>
            </Flex>
          </Body>
        </Margin>
      </Container>
    </Wrapper>
  );
}

export default DashboardPage;

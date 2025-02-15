import React, { useState } from "react";
import styled from "styled-components";
import SelectedApplicantProfileWidget from "../../components/widget/profile/SelectedApplicantWidget";
import TaskDetailsCard from "../../components/widget/task/TaskDetailsCard";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div`
  width: 100%;
  height: inherit;
  overflow-y: hidden;
`;
const Switch = styled.div`
  ul {
    width: fit-content;
    padding: 0px;
    margin: 20px auto;
    display: flex;
    gap: 20px;
    font-size: ${FontSize.small};
    color: ${Colors.subtitleBlack};
    li {
      list-style: none;
      cursor: pointer;
    }
  }
`;
const Padding = styled.div`
  height: 40px;
`;
const Content = styled.div`
  width: calc(100% - 0.5px);
  padding-right: 1px;
  height: 100%;
  overflow-y: scroll;
`;
function TaskDetailsTabbedPanel() {
  const [currentPanel, setCurrentPanel] = useState("Members");
  return (
    <Wrapper>
      <Switch>
        <ul>
          <li
            style={
              currentPanel === "Members"
                ? { color: "#000000", fontWeight: 400 }
                : {}
            }
            onClick={() => {
              setCurrentPanel("Members");
            }}
          >
            Members
          </li>
          <li
            style={
              currentPanel === "Tasks"
                ? { color: "#000000", fontWeight: 400 }
                : {}
            }
            onClick={() => {
              setCurrentPanel("Tasks");
            }}
          >
            Tasks(6)
          </li>
          <li
            style={
              currentPanel === "Completed Tasks"
                ? { color: "#000000", fontWeight: 400 }
                : {}
            }
            onClick={() => {
              setCurrentPanel("Completed Tasks");
            }}
          >
            Completed Tasks (3)
          </li>
        </ul>
      </Switch>
      {
        <Content>
          {currentPanel === "Tasks" ? (
            <>
              <TaskDetailsCard />
              <TaskDetailsCard />
              <TaskDetailsCard />
              <TaskDetailsCard />
            </>
          ) : currentPanel === "Completed Tasks" ? (
            <>
              <TaskDetailsCard completed={"Delayed"} />
            </>
          ) : (
            <>
              <SelectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"3 weeks ago"}
              />
              <SelectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"3 weeks ago"}
              />
              <SelectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"3 weeks ago"}
              />
              <SelectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"3 weeks ago"}
              />
              <SelectedApplicantProfileWidget
                name={"Saugat Singh"}
                postedTime={"3 weeks ago"}
              />
            </>
          )}
          <Padding />
          <Padding />
        </Content>
      }
    </Wrapper>
  );
}

export default TaskDetailsTabbedPanel;

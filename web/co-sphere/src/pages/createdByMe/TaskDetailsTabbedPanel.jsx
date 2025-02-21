import React, { useState } from "react";
import styled from "styled-components";
import { useToast } from "../../common/manager/contextManager/ToastContextManager";
import CreateTaskButton from "../../components/buttons/CreateTaskButton";
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
const Button = styled.div`
  button {
    width: 100px;
  }
  margin-bottom: 2px;
  display: flex;
  justify-content: right;
`;
function TaskDetailsTabbedPanel({ setOverlay, project }) {
  const [currentPanel, setCurrentPanel] = useState("Members");
  const { showToast } = useToast();

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
      <Button>
        <CreateTaskButton
          onClick={() => {
            setOverlay(true);
          }}
        />
      </Button>

      {
        <Content>
          {currentPanel === "Tasks" ? (
            <>
              {project.tasks &&
                project.tasks.map((task, key) => (
                  <TaskDetailsCard key={key} task={task} />
                ))}
            </>
          ) : currentPanel === "Completed Tasks" ? (
            <>
              <TaskDetailsCard completed={"Delayed"} />
            </>
          ) : (
            <>
              {project &&
                project.members.map((member, key) => (
                  <SelectedApplicantProfileWidget
                    key={key}
                    name={member.fullname}
                    profileImage={member.profileImage}
                  />
                ))}
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

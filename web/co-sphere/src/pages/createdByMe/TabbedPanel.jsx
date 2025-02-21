import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import ActiveTasks from "./ActiveTasks";
import CompletedTasks from "./CompletedTasks";
import HiringTasks from "./HiringTasks";

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
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
function TabbedPanel({ setCurrentProject, reload }) {
  const [currentPanel, setCurrentPanel] = useState("Hiring");
  return (
    <Wrapper>
      <Switch>
        <ul>
          <li
            style={
              currentPanel === "Hiring"
                ? { color: "#000000", fontWeight: 400 }
                : {}
            }
            onClick={() => {
              setCurrentPanel("Hiring");
            }}
          >
            Hiring
          </li>
          <li
            style={
              currentPanel === "Active"
                ? { color: "#000000", fontWeight: 400 }
                : {}
            }
            onClick={() => {
              setCurrentPanel("Active");
            }}
          >
            Active
          </li>
          <li
            style={
              currentPanel === "Completed"
                ? { color: "#000000", fontWeight: 400 }
                : {}
            }
            onClick={() => {
              setCurrentPanel("Completed");
            }}
          >
            Completed
          </li>
        </ul>
      </Switch>
      {
        <Content>
          {currentPanel === "Hiring" ? (
            <HiringTasks
              onClick={(project) =>
                setCurrentProject({ project, type: "hiring" })
              }
              reload={reload}
            />
          ) : currentPanel === "Completed" ? (
            <CompletedTasks />
          ) : (
            <ActiveTasks />
          )}
          <Padding />
        </Content>
      }
    </Wrapper>
  );
}

export default TabbedPanel;

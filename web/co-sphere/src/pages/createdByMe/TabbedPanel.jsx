import React, { useEffect, useState } from "react";
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
function TabbedPanel({ onSelect, reload, defaultPanel, selectedProject }) {
  const [currentPanel, setCurrentPanel] = useState("hiring");
  useEffect(() => {
    if (defaultPanel != null) {
      setCurrentPanel(defaultPanel.toLowerCase());
    }
  }, [defaultPanel]);
  return (
    <Wrapper>
      <Switch>
        <ul>
          <li
            style={
              currentPanel === "hiring"
                ? { color: "#000000", fontWeight: 400 }
                : {}
            }
            onClick={() => {
              setCurrentPanel("hiring");
            }}
          >
            Hiring
          </li>
          <li
            style={
              currentPanel === "active"
                ? { color: "#000000", fontWeight: 400 }
                : {}
            }
            onClick={() => {
              setCurrentPanel("active");
            }}
          >
            Active
          </li>
          <li
            style={
              currentPanel === "completed"
                ? { color: "#000000", fontWeight: 400 }
                : {}
            }
            onClick={() => {
              setCurrentPanel("completed");
            }}
          >
            Completed
          </li>
        </ul>
      </Switch>
      {
        <Content>
          {currentPanel === "hiring" ? (
            <HiringTasks
              selectedProject={selectedProject}
              onClick={(project) => onSelect({ project, type: "hiring" })}
              reload={reload}
            />
          ) : currentPanel === "completed" ? (
            <CompletedTasks
              onClick={(project) => onSelect({ project, type: "completed" })}
              selectedProject={selectedProject}
            />
          ) : (
            <ActiveTasks reload={reload} selectedProject={selectedProject} />
          )}
          <Padding />
        </Content>
      }
    </Wrapper>
  );
}

export default TabbedPanel;

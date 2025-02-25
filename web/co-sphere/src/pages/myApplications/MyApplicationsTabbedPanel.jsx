import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

import CompletedTasks from "../createdByMe/CompletedTasks";
import AcceptedApplications from "./AcceptedApplications";
import PendingApplications from "./PendingApplications";

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
function MyApplicationsTabbedPannel({ onSelect, reload, defaultPanel }) {
  const [currentPanel, setCurrentPanel] = useState("pending");
  useEffect(() => {
    if (defaultPanel != null) {
      setCurrentPanel(defaultPanel);
    }
  }, [defaultPanel]);
  return (
    <Wrapper>
      <Switch>
        <ul>
          <li
            style={
              currentPanel === "pending"
                ? { color: "#000000", fontWeight: 400 }
                : {}
            }
            onClick={() => {
              setCurrentPanel("pending");
            }}
          >
            Pending/Rejected
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
          {currentPanel === "pending" ? (
            <PendingApplications
              onClick={(project) => onSelect({ project, type: "hiring" })}
              reload={reload}
            />
          ) : currentPanel === "completed" ? (
            <CompletedTasks
              onClick={(project) => onSelect({ project, type: "completed" })}
            />
          ) : (
            <AcceptedApplications reload={reload} />
          )}
          <Padding />
        </Content>
      }
    </Wrapper>
  );
}

export default MyApplicationsTabbedPannel;

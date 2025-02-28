import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import JobDetails from "../../components/widget/job/JobDetails";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import SplitLayout from "../common/SplitLayout";
import ActiveTaskDetails from "../createdByMe/ActiveTaskDetails";
import CompletedTaskDetails from "../createdByMe/CompletedTaskDetails";
import MyApplicationsTabbedPannel from "./MyApplicationsTabbedPanel";

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
function MyApplicationsPage() {
  const [currentProject, setCurrentProject] = useState({});
  const [updateState, setUpdateState] = useState();
  const { type, project } = useParams();
  const navigate = useNavigate();
  useEffect(() => {}, [updateState]);

  useEffect(() => {
    type != null && project != null
      ? setCurrentProject({ project, type: type.toLowerCase() })
      : (() => {})();
  }, [project, type]);
  return (
    <SplitLayout
      left={
        <>
          <LeftWrapper>
            <LeftContainer>
              <Title>My Applications</Title>
              <MyApplicationsTabbedPannel
                onSelect={(details) => {
                  navigate(
                    `/my-applications/${details.type}/${details.project}`
                  );
                }}
                reload={updateState}
                defaultPanel={type ?? null}
                projectId={project}
              />
            </LeftContainer>
          </LeftWrapper>
        </>
      }
      right={
        <>
          <RightWrapper key={currentProject.project}>
            {currentProject && currentProject.type === "completed" ? (
              <CompletedTaskDetails projectId={currentProject.project} />
            ) : currentProject.type === "active" ||
              currentProject.type === "accepted" ? (
              <ActiveTaskDetails
                projectId={currentProject.project}
                updateState={(state) => setUpdateState(state)}
              />
            ) : currentProject.type === "pending" ||
              currentProject.type === "rejected" ? (
              <JobDetails projectId={currentProject.project} />
            ) : (
              <>Empty</>
            )}
          </RightWrapper>
        </>
      }
      page={"my applications"}
    />
  );
}

export default MyApplicationsPage;

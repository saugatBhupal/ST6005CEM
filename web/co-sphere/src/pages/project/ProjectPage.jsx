import React from "react";
import { useParams } from "react-router-dom";
import JobDetails from "../../components/widget/job/JobDetails";
import LoggedInUserLayout from "../common/LoggedInUserLayout";

function ProjectPage() {
  const { projectId } = useParams();
  return (
    <LoggedInUserLayout
      page={"browse"}
      body={<JobDetails projectId={projectId} />}
    />
  );
}

export default ProjectPage;

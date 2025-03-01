import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobDetails from "../../components/widget/job/JobDetails";
import { getUserFromLocalStorage } from "../../service/LocalStorageService";
import LoggedInUserLayout from "../common/LoggedInUserLayout";
import LoggedOutUserLayout from "../common/LoggedOutUserLayout";

function ProjectPage() {
  const { projectId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    async function getUser() {
      const user = await getUserFromLocalStorage();
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    getUser();
  }, []);
  return isLoggedIn ? (
    <LoggedInUserLayout
      page={"browse"}
      body={<JobDetails projectId={projectId} />}
    />
  ) : (
    <LoggedOutUserLayout
      page={"browse"}
      body={<JobDetails projectId={projectId} />}
    />
  );
}

export default ProjectPage;

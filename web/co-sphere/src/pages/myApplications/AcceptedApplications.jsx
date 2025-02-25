import React, { useEffect, useState } from "react";
import { manageGetAppliedProjects } from "../../common/manager/projectManager/ProjectManager";
import AppliedTaskWidget from "../../components/widget/task/AppliedTaskWidget";

function AcceptedApplications({ onClick, reload, type }) {
  const [applications, setApplications] = useState();
  useEffect(() => {
    async function getAcceptedApplications() {
      await manageGetAppliedProjects(
        (application) => {
          setApplications(application);
        },
        (err) => {
          console.log(err);
          setApplications(null);
        }
      );
    }
    getAcceptedApplications();
  }, [reload]);
  return (
    <div>
      {applications &&
        applications.map((application, key) =>
          application.status === "Accepted" ? (
            <AppliedTaskWidget application={application} key={key} />
          ) : (
            <></>
          )
        )}
    </div>
  );
}

export default AcceptedApplications;

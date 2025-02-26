import React, { useEffect, useState } from "react";
import { manageGetAppliedProjects } from "../../common/manager/projectManager/ProjectManager";
import AppliedTaskWidget from "../../components/widget/task/AppliedTaskWidget";

function PendingApplications({ onClick, reload }) {
  const [applications, setApplications] = useState();

  useEffect(() => {
    async function getPendingApplications() {
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
    getPendingApplications();
  }, [reload]);
  return (
    <div>
      {applications &&
        applications.map((application, key) =>
          application.status !== "Accepted" ? (
            <AppliedTaskWidget
              application={application}
              key={key}
              onClick={(applicationId) => {
                onClick(applicationId);
              }}
            />
          ) : (
            <></>
          )
        )}
    </div>
  );
}

export default PendingApplications;

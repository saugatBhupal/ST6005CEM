import React, { useEffect, useState } from "react";
import { manageGetAppliedProjects } from "../../common/manager/projectManager/ProjectManager";
import SpinnerWidget from "../../components/loading/SpinnerWidget";
import AppliedTaskWidget from "../../components/widget/task/AppliedTaskWidget";

function PendingApplications({ onClick, reload, selectedProject }) {
  const [applications, setApplications] = useState();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
    getPendingApplications();
  }, [reload]);
  return (
    <div>
      {loading && <SpinnerWidget />}
      {applications &&
        applications.map((application, key) =>
          application.status !== "Accepted" ? (
            <AppliedTaskWidget
              application={application}
              key={key}
              onClick={(applicationId) => {
                onClick(applicationId);
              }}
              isSelected={application._id === selectedProject}
            />
          ) : (
            <></>
          )
        )}
    </div>
  );
}

export default PendingApplications;

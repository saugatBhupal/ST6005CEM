import React, { useEffect, useState } from "react";
import { manageGetAppliedProjects } from "../../common/manager/projectManager/ProjectManager";
import SpinnerWidget from "../../components/loading/SpinnerWidget";
import AppliedTaskWidget from "../../components/widget/task/AppliedTaskWidget";

function AcceptedApplications({ onClick, reload, selectedProject }) {
  const [applications, setApplications] = useState();
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    }
    getAcceptedApplications();
  }, [reload]);
  return (
    <div>
      {loading && <SpinnerWidget />}
      {applications &&
        applications.map((application, key) =>
          application.status === "Accepted" &&
          application.projectStatus === "Active" ? (
            <AppliedTaskWidget
              application={application}
              key={key}
              onClick={(projectId) => {
                onClick(projectId);
              }}
              isSelected={selectedProject === application._id}
            />
          ) : (
            <></>
          )
        )}
    </div>
  );
}

export default AcceptedApplications;

import React, { useEffect, useState } from "react";
import { manageGetHiringProjectsCreatedByUser } from "../../common/manager/projectManager/ProjectManager";
import ApplicationsCreatedByMeWidget from "../../components/widget/application/ApplicationsCreatedByMeWidget";

function HiringTasks({ onClick, reload }) {
  const [projects, setProjects] = useState();
  useEffect(() => {
    async function getHiringProjects() {
      await manageGetHiringProjectsCreatedByUser(
        (projects) => {
          setProjects(projects);
        },
        (err) => {
          console.log(err);
          setProjects(null);
        }
      );
    }
    getHiringProjects();
  }, [reload]);
  return (
    <div>
      {projects &&
        projects.map((project, key) => (
          <ApplicationsCreatedByMeWidget
            project={project}
            key={key}
            onClick={(projectId) => {
              onClick(projectId, "hiring");
            }}
          />
        ))}
    </div>
  );
}

export default HiringTasks;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { manageGetHiringProjectsCreatedByUser } from "../../common/manager/projectManager/ProjectManager";
import ApplicationsCreatedByMeWidget from "../../components/widget/application/ApplicationsCreatedByMeWidget";

function HiringTasks({ onClick, reload, type }) {
  const [projects, setProjects] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function getHiringProjects() {
      await manageGetHiringProjectsCreatedByUser(
        (projects) => {
          setProjects(projects);
        },
        (err) => {
          console.log(err);
          setProjects(null)
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
              onClick(projectId);
            }}
          />
        ))}
    </div>
  );
}

export default HiringTasks;

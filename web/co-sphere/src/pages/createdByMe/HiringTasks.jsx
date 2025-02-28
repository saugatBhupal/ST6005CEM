import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { manageGetHiringProjectsCreatedByUser } from "../../common/manager/projectManager/ProjectManager";
import SpinnerWidget from "../../components/loading/SpinnerWidget";
import ApplicationsCreatedByMeWidget from "../../components/widget/application/ApplicationsCreatedByMeWidget";

function HiringTasks({ onClick, reload, type }) {
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
      setLoading(false);
    }
    getHiringProjects();
  }, [reload]);
  return (
    <div>
      {loading && <SpinnerWidget />}
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

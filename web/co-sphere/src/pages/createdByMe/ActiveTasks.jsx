import React, { useEffect, useState } from "react";
import { manageGetActiveProjectsCreatedByUser } from "../../common/manager/projectManager/ProjectManager";
import TaskActiveCard from "../../components/widget/task/TaskActiveCard";

function ActiveTasks({ reload }) {
  const [projects, setProjects] = useState();
  useEffect(() => {
    async function getActiveProjects() {
      await manageGetActiveProjectsCreatedByUser(
        (projects) => {
          setProjects(projects);
        },
        (err) => {
          console.log(err);
          setProjects(null);
        }
      );
    }
    getActiveProjects();
  }, [reload]);
  return (
    <div>
      {projects &&
        projects.map((project, key) => (
          <TaskActiveCard project={project} key={key} />
        ))}
    </div>
  );
}

export default ActiveTasks;

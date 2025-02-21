import React, { useEffect, useState } from "react";
import { manageGetActiveProjectsCreatedByUser } from "../../common/manager/projectManager/ProjectManager";
import TaskActiveCard from "../../components/widget/task/TaskActiveCard";

function ActiveTasks() {
  const [projects, setProjects] = useState();
  useEffect(() => {
    async function getHiringProjects() {
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
    getHiringProjects();
  }, []);
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

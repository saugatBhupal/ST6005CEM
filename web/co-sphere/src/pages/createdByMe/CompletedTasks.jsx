import React, { useEffect, useState } from "react";
import { manageGetCompletedProjectsCreatedByUser } from "../../common/manager/projectManager/ProjectManager";
import TaskCompletedCard from "../../components/widget/task/TaskCompletedCard";

function CompletedTasks({ onClick }) {
  const [projects, setProjects] = useState();
  useEffect(() => {
    async function getHiringProjects() {
      await manageGetCompletedProjectsCreatedByUser(
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
          <TaskCompletedCard onClick={onClick} project={project} key={key} />
        ))}
    </div>
  );
}

export default CompletedTasks;

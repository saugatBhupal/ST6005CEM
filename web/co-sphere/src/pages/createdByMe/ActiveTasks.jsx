import React, { useEffect, useState } from "react";
import { manageGetActiveProjectsCreatedByUser } from "../../common/manager/projectManager/ProjectManager";
import SpinnerWidget from "../../components/loading/SpinnerWidget";
import TaskActiveCard from "../../components/widget/task/TaskActiveCard";

function ActiveTasks({ reload }) {
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    }
    getActiveProjects();
  }, [reload]);
  return (
    <div>
      {loading && <SpinnerWidget />}
      {projects &&
        projects.map((project, key) => (
          <TaskActiveCard project={project} key={key} />
        ))}
    </div>
  );
}

export default ActiveTasks;

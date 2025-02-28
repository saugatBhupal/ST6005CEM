import React, { useEffect, useState } from "react";
import { manageGetCompletedProjectsCreatedByUser } from "../../common/manager/projectManager/ProjectManager";
import SpinnerWidget from "../../components/loading/SpinnerWidget";
import TaskCompletedCard from "../../components/widget/task/TaskCompletedCard";

function CompletedTasks({ onClick, selectedProject }) {
  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    }
    getHiringProjects();
  }, []);
  return (
    <div>
      {loading && <SpinnerWidget />}
      {projects &&
        projects.map((project, key) => (
          <TaskCompletedCard
            onClick={onClick}
            project={project}
            key={key}
            isSelected={selectedProject === project._id}
          />
        ))}
    </div>
  );
}

export default CompletedTasks;

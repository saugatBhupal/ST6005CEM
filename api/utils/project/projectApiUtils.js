const populateApplicantsWithStatus = (project) => {
  const pending = project.applicants.filter(
    (applicant) => applicant.status === "Pending"
  );
  const rejected = project.applicants.filter(
    (applicant) => applicant.status === "Rejected"
  );
  const accepted = project.applicants.filter(
    (applicant) => applicant.status === "Accepted"
  );
  return {
    ...project.toObject(),
    pendingApplicants: pending,
    rejectedApplicants: rejected,
    acceptedApplicants: accepted,
  };
};

const populateApplicantsWithStatusFromList = (projects) => {
  return projects.map((project) => {
    const pending = project.applicants.filter(
      (applicant) => applicant.status === "Pending"
    );
    const rejected = project.applicants.filter(
      (applicant) => applicant.status === "Rejected"
    );
    const accepted = project.applicants.filter(
      (applicant) => applicant.status === "Accepted"
    );
    return {
      ...project.toObject(),
      pendingApplicants: pending,
      rejectedApplicants: rejected,
      acceptedApplicants: accepted,
    };
  });
};
const populateTasksWithStatus = (project) => {
  const active = project.tasks.filter((task) => task.status === "Active");
  const completed = project.tasks.filter((task) => task.status === "Completed");
  return {
    ...project,
    activeTasks: active,
    completedTasks: completed,
  };
};
module.exports = {
  populateApplicantsWithStatus,
  populateApplicantsWithStatusFromList,
  populateTasksWithStatus,
};

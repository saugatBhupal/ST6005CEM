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
module.exports = {
  populateApplicantsWithStatus,
  populateApplicantsWithStatusFromList,
};

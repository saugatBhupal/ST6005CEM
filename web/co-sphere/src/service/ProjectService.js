import request from "../config/apiConfig/Request";

export async function getAppliedProjectService(userId, callback) {
  await request
    .get(`/project/applied-projects/${userId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

export async function getProjectCreatedByUserService(userId, callback) {
  await request
    .get(`/project/user/${userId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function getHiringProjectsByUserService(userId, callback) {
  await request
    .get(`/project/hiring/${userId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function getActiveProjectsByUserService(userId, callback) {
  await request
    .get(`/project/active/${userId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function getCompletedProjectsByUserService(userId, callback) {
  await request
    .get(`/project/completed/${userId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function getProjectByIdService(projectId, callback) {
  await request
    .get(`/project/${projectId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function hireUserService(details, callback) {
  await request
    .post(`/project/hire`, details, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function rejectUserService(details, callback) {
  await request
    .post(`/project/reject`, details, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function finishHiringService(postId, callback) {
  await request
    .post(`/project/finish-hiring/${postId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function getTasksByProjectService(postId, callback) {
  await request
    .get(`/project/${postId}/task`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

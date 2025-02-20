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

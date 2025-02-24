import request from "../config/apiConfig/Request";

export async function getUserByIdService(userId, callback) {
  await request
    .get(`/user/${userId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      console.log(e);
      callback(response);
    });
}
export async function getHistoryByUserIdService(userId, callback) {
  await request
    .get(`/user/${userId}/history`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      console.log(e);
      callback(response);
    });
}
export async function getExperienceByUserIdService(userId, callback) {
  await request
    .get(`/user/experience/${userId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      console.log(e);
      callback(response);
    });
}
export async function getEducationByUserIdService(userId, callback) {
  await request
    .get(`/user/education/${userId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      console.log(e);
      callback(response);
    });
}
export async function uploadProfileImageService(formdata, callback) {
  await request
    .post(`/user/profile-image/`, formdata, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      console.log(e);
      callback(response);
    });
}

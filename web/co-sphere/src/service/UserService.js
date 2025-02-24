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

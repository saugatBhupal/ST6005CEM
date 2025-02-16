import request from "../config/apiConfig/Request";

export async function getAllConversationsService(userId, callback) {
  await request
    .get(`/conversation/user/${userId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

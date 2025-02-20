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
export async function getConversationsByMembersService(members, callback) {
  await request
    .post(`/conversation/`, members, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

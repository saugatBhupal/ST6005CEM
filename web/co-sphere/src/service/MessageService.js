import request from "../config/apiConfig/Request";

export async function sendMessageService(conversationId, details, callback) {
  await request
    .post(`/message/${conversationId}`, details, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

export async function getAllMessageFromConversation(conversationId, callback) {
  await request
    .get(`/message/${conversationId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

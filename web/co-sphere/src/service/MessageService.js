import request from "../config/apiConfig/Request";

export async function sendMessageService(details, callback) {
  await request
    .post("/message/67b199361951254f65c360f5", details, { headers: {} })
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

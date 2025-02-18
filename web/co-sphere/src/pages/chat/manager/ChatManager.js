import {
  getAllMessageFromConversation,
  sendMessageService,
} from "../../../service/MessageService";

export async function manageSendMessage(data, onSuccess, onFailure) {
  let conversationId = data.conversationId;
  data = { senderID: data.senderId, content: data.content };
  try {
    await sendMessageService(conversationId, data, async (response) => {
      if (response.status === 200) {
        onSuccess();
      } else {
        onFailure(response.data.message);
      }
    });
  } catch (e) {
    onFailure("Error connecting to network.");
  }
}

export async function manageGetAllMessages(
  conversationId,
  onSuccess,
  onFailure
) {
  try {
    await getAllMessageFromConversation(conversationId, async (response) => {
      if (response.status === 200) {
        onSuccess(response.data);
      } else {
        console.log(response);
        onFailure(response.data.message);
      }
    });
  } catch (e) {
    onFailure("Error connecting to network.");
  }
}

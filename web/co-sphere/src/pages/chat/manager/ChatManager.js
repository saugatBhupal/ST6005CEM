import { sendMessageService } from "../../../service/MessageService";

export async function manageSendMessage(data, onSuccess, onFailure) {
  data = { senderID: data.senderId, content: data.content };
  try {
    await sendMessageService(data, async (response) => {
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

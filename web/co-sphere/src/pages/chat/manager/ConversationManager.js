import {
  getAllConversationsService,
  getConversationsByMembersService,
} from "../../../service/ConversationService";
import {} from "../../../service/MessageService";

export async function manageGetAllConversations(userId, onSuccess, onFailure) {
  try {
    await getAllConversationsService(userId, async (response) => {
      if (response.status === 200) {
        onSuccess(response.data);
      } else {
        onFailure(response.data.message);
      }
    });
  } catch (e) {
    onFailure("Error connecting to network.");
  }
}

export async function manageGetConversationByMembers(
  members,
  onSuccess,
  onFailure
) {
  try {
    await getConversationsByMembersService(members, async (response) => {
      if (response.status === 200) {
        onSuccess(response.data);
      } else {
        onFailure(response.data.message);
      }
    });
  } catch (e) {
    onFailure("Error connecting to network.");
  }
}

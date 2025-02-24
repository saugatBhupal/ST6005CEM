import {
  getHistoryByUserIdService,
  getUserByIdService,
} from "../../../service/UserService";

export async function manageGetUserById(userId, onSuccess, onFailure) {
  try {
    await getUserByIdService(userId, async (response) => {
      if (response.status === 200) {
        onSuccess(response.data.data);
      } else {
        onFailure(response.data.message);
      }
    });
  } catch (e) {
    onFailure("Error connecting to network.");
  }
}
export async function manageGetHistoryByUserId(userId, onSuccess, onFailure) {
  try {
    await getHistoryByUserIdService(userId, async (response) => {
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

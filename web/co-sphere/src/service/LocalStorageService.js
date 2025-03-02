import {
  getContext,
  updateProfileImage,
} from "../common/manager/contextManager/ContextManager";
import { getUserByIdService } from "./UserService";

export async function getUserIdFromLocalStorage() {
  const localContext = await getContext();
  return localContext ? localContext.user._id : null;
}

export async function getUserFromLocalStorage() {
  const localContext = await getContext();
  return localContext ? localContext.user : null;
}

export async function updateLocalProfileImage() {
  const localContext = await getContext();
  localContext &&
    (await getUserByIdService(localContext.user._id, async (res) => {
      await updateProfileImage(res.data.data.profileImage);
    }));
}

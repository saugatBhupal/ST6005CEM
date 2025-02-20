import { getUserIdFromLocalStorage } from "../../../service/LocalStorageService";
import {
  getAppliedProjectService,
  getProjectCreatedByUserService,
} from "../../../service/ProjectService";

export async function manageGetAppliedProjects(onSuccess, onFailure) {
  const userId = await getUserIdFromLocalStorage();
  if (userId)
    try {
      await getAppliedProjectService(userId, async (response) => {
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

export async function manageGetProjectsCreatedByUser(onSuccess, onFailure) {
  const userId = await getUserIdFromLocalStorage();
  if (userId)
    try {
      await getProjectCreatedByUserService(userId, async (response) => {
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

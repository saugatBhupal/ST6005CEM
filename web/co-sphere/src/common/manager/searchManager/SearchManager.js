import { getUserIdFromLocalStorage } from "../../../service/LocalStorageService";
import {
  getRecentSearches,
  updateRecentSearch,
} from "../../../service/SearchService";

export async function manageGetRecentSearches(userId, onSuccess, onFailure) {
  try {
    await getRecentSearches(userId, async (response) => {
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
export async function manageUpdateSearch(query, onSuccess, onFailure) {
  const userId = await getUserIdFromLocalStorage();
  if (userId)
    try {
      await updateRecentSearch(
        { userId: userId, query: query },
        async (response) => {
          if (response.status === 200) {
            onSuccess(response.data);
          } else {
            onFailure(response.data.message);
          }
        }
      );
    } catch (e) {
      onFailure("Error connecting to network.");
    }
}

import { getAppliedJobsService } from "../../../service/JobService";
import { getUserIdFromLocalStorage } from "../../../service/LocalStorageService";

export async function manageGetAppliedJobs(onSuccess, onFailure) {
  const userId = await getUserIdFromLocalStorage();
  if (userId)
    try {
      await getAppliedJobsService(userId, async (response) => {
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

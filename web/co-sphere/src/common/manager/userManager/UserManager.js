import { getUserIdFromLocalStorage } from "../../../service/LocalStorageService";
import {
  addEducationService,
  addExperienceService,
  getActiveTasksService,
  getEducationByUserIdService,
  getExperienceByUserIdService,
  getHistoryByUserIdService,
  getUserByIdService,
  updateProfileIntroService,
  uploadProfileImageService,
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
export async function manageGetExperienceByUserId(
  userId,
  onSuccess,
  onFailure
) {
  try {
    await getExperienceByUserIdService(userId, async (response) => {
      if (response.status === 200) {
        onSuccess(response.data.data.experience);
      } else {
        onFailure(response.data.message);
      }
    });
  } catch (e) {
    onFailure("Error connecting to network.");
  }
}
export async function manageGetEducationByUserId(userId, onSuccess, onFailure) {
  try {
    await getEducationByUserIdService(userId, async (response) => {
      if (response.status === 200) {
        onSuccess(response.data.data.education);
      } else {
        onFailure(response.data.message);
      }
    });
  } catch (e) {
    onFailure("Error connecting to network.");
  }
}
export async function manageUploadProfileImage(formdata, onSuccess, onFailure) {
  try {
    await uploadProfileImageService(formdata, async (response) => {
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
export async function manageUpdateIntro(details, onSuccess, onFailure) {
  try {
    await updateProfileIntroService(details, async (response) => {
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
export async function manageAddExperience(details, onSuccess, onFailure) {
  try {
    await addExperienceService(details, async (response) => {
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
export async function manageAddEducation(details, onSuccess, onFailure) {
  try {
    await addEducationService(details, async (response) => {
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
export async function manageGetActiveTasks(onSuccess, onFailure) {
  const userId = await getUserIdFromLocalStorage();
  if (userId)
    try {
      await getActiveTasksService(userId, async (response) => {
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

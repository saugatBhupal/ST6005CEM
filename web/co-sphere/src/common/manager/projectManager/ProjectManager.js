import { getUserIdFromLocalStorage } from "../../../service/LocalStorageService";
import {
  getActiveProjectsByUserService,
  getAppliedProjectService,
  getCompletedProjectsByUserService,
  getHiringProjectsByUserService,
  getProjectByIdService,
  getProjectCreatedByUserService,
  hireUser,
  rejectUser,
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
export async function manageGetHiringProjectsCreatedByUser(
  onSuccess,
  onFailure
) {
  const userId = await getUserIdFromLocalStorage();
  if (userId)
    try {
      await getHiringProjectsByUserService(userId, async (response) => {
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
export async function manageGetActiveProjectsCreatedByUser(
  onSuccess,
  onFailure
) {
  const userId = await getUserIdFromLocalStorage();
  if (userId)
    try {
      await getActiveProjectsByUserService(userId, async (response) => {
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
export async function manageGetCompletedProjectsCreatedByUser(
  onSuccess,
  onFailure
) {
  const userId = await getUserIdFromLocalStorage();
  if (userId)
    try {
      await getCompletedProjectsByUserService(userId, async (response) => {
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
export async function manageGetProjectById(projectId, onSuccess, onFailure) {
  try {
    await getProjectByIdService(projectId, async (response) => {
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
export async function manageHireUser(details, onSuccess, onFailure) {
  try {
    await hireUser(details, async (response) => {
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
export async function manageRejectUser(details, onSuccess, onFailure) {
  try {
    await rejectUser(details, async (response) => {
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


import { getUserIdFromLocalStorage } from "../../../service/LocalStorageService";
import {
  addTaskService,
  applyProjectService,
  completeProjectService,
  completeTaskService,
  finishHiringService,
  getActiveProjectsByUserService,
  getAppliedProjectService,
  getCompletedProjectsByUserService,
  getHiringProjectsByUserService,
  getProjectByIdService,
  getProjectCreatedByUserService,
  hireUserService,
  rejectUserService,
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
    await hireUserService(details, async (response) => {
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
    await rejectUserService(details, async (response) => {
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
export async function manageFinishHiring(projectId, onSuccess, onFailure) {
  try {
    await finishHiringService(projectId, async (response) => {
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
export async function manageGetTasksByProject(projectId, onSuccess, onFailure) {
  try {
    await finishHiringService(projectId, async (response) => {
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

export async function manageCompleteTask(details, onSuccess, onFailure) {
  try {
    await completeTaskService(details, async (response) => {
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
export async function manageAddTask(details, onSuccess, onFailure) {
  try {
    await addTaskService(details, async (response) => {
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
export async function manageCompleteProject(details, onSuccess, onFailure) {
  try {
    await completeProjectService(details, async (response) => {
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
export async function manageApplyToProject(details, onSuccess, onFailure) {
  try {
    await applyProjectService(details, async (response) => {
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

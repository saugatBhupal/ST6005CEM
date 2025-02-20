import {
  searchJobs,
  searchProjects,
  searchUsers,
} from "../../../service/SearchService";

export async function manageSearch(type, query, onSuccess, onFailure) {
  switch (type) {
    case "user":
      await manageSearchUser(query, onSuccess, onFailure);
      break;
    case "project":
      await manageSearchProjects(query, onSuccess, onFailure);
      break;
    default:
      await manageSearchJobs(query, onSuccess, onFailure);
      break;
  }
}

export async function manageSearchUser(query, onSuccess, onFailure) {
  try {
    await searchUsers(query, async (response) => {
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
export async function manageSearchProjects(query, onSuccess, onFailure) {
  try {
    await searchProjects(query, async (response) => {
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

export async function manageSearchJobs(query, onSuccess, onFailure) {
  try {
    await searchJobs(query, async (response) => {
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

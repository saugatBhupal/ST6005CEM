import request from "../config/apiConfig/Request";

export async function getRecentSearches(userId, callback) {
  await request
    .get(`/user/search-history/${userId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

export async function updateRecentSearch(data, callback) {
  await request
    .post(`/user/search-history`, data, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function searchUsers(query, callback) {
  await request
    .get(`/user/name/${query}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

export async function searchProjects(query, callback) {
  await request
    .get(`/project/name/${query}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function searchJobs(query, callback) {
  await request
    .get(`/job/name/${query}`, { headers: {} })
    .then((response) => {
      console.log(response);
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

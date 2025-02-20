import request from "../config/apiConfig/Request";

export async function getAppliedJobsService(userId, callback) {
  await request
    .get(`/job/applied-jobs/${userId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

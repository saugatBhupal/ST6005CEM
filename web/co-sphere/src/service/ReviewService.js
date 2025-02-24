import request from "../config/apiConfig/Request";

export async function addReviewService(details, callback) {
  await request
    .post(`/review/${details.projectId}`, details, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function getReviewByIdService(reviewId, callback) {
  await request
    .get(`/review/${reviewId}`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}
export async function getReviewsByUserIdService(userId, callback) {
  await request
    .get(`/user/${userId}/reviews`, { headers: {} })
    .then((response) => {
      callback(response);
    })
    .catch((e) => {
      var response = e.response;
      callback(response);
    });
}

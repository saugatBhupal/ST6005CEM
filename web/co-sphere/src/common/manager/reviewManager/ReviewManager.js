import {
  addReviewService,
  getReviewByIdService,
} from "../../../service/ReviewService";

export async function manageAddReview(details, onSuccess, onFailure) {
  try {
    await addReviewService(details, async (response) => {
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
export async function manageGetReviewById(reviewId, onSuccess, onFailure) {
  try {
    await getReviewByIdService(reviewId, async (response) => {
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

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useToast } from "../../common/manager/contextManager/ToastContextManager";
import { manageGetReviewByUserId } from "../../common/manager/reviewManager/ReviewManager";
import ReviewCard from "../../components/widget/review/ReviewCard";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div``;
const Title = styled.div`
  font-size: ${FontSize.small};
  font-weight: 500;
  color: ${Colors.subtitleBlack};
  margin-bottom: 10px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
function ReviewSection({ userId }) {
  const [reviews, setReviews] = useState();
  const { showToast } = useToast();
  useEffect(() => {
    async function getReviews() {
      await manageGetReviewByUserId(
        userId,
        (reviews) => {
          setReviews(reviews);
          console.log(reviews.reviews);
        },
        (err) => {
          showToast(err);
          setReviews(null);
        }
      );
    }
    getReviews();
  }, []);
  return (
    <Wrapper>
      <Title>Employer Review</Title>
      <Column>
        {reviews &&
          reviews.reviews.map((review, key) => (
            <ReviewCard reviewId={review} key={key} />
          ))}
      </Column>
    </Wrapper>
  );
}

export default ReviewSection;

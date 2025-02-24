import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useToast } from "../../../common/manager/contextManager/ToastContextManager";
import { manageGetReviewById } from "../../../common/manager/reviewManager/ReviewManager";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import ProfileWidget from "../profile/ProfileWidget";

const Wrapper = styled.div`
  min-height: 80px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  /* margin: 10px 0px; */
  align-items: center;
`;
const Left = styled.div``;

const Right = styled.div`
  margin-left: 20px;
`;
const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;
const Flex = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;
const Dot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin: 1px;
  background-color: ${Colors.mainBlue};
`;

const SubTitle = styled.div`
  font-size: ${FontSize.small};
  font-weight: 300;
  color: ${Colors.subtitleBlack};
`;
const Star = styled.div`
  color: ${Colors.mainBlue};
`;
function ReviewCard({ reviewId, showUser }) {
  const [review, setReview] = useState();
  const { showToast } = useToast();

  useEffect(() => {
    async function getReview() {
      await manageGetReviewById(
        reviewId,
        (review) => {
          setReview(review);
        },
        (err) => {
          showToast(err);
          setReview(null);
        }
      );
    }
    getReview();
  }, []);
  return (
    review && (
      <Wrapper>
        {showUser && (
          <ProfileWidget
            image={review.user.profileImage}
            name={review.user.fullname}
          />
        )}

        <Container>
          <Flex>
            <Left>
              <SubTitle>{review.review}</SubTitle>
            </Left>
            <Right>
              <Column>
                <Flex>
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star>★</Star>
                  ))}
                </Flex>
                <SubTitle>{review.reviewedBy.fullname}</SubTitle>
              </Column>
            </Right>
          </Flex>
        </Container>
      </Wrapper>
    )
  );
}

export default ReviewCard;

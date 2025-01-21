import React from "react";
import styled from "styled-components";
import ReviewCard from "../../components/widget/review/ReviewCard";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div``;
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${Colors.subtitleBlack};
  margin-bottom: 10px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
function ReviewSection() {
  return (
    <Wrapper>
      <Title>Employer Review</Title>
      <Column>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </Column>
    </Wrapper>
  );
}

export default ReviewSection;

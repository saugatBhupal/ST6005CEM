import React from "react";
import styled from "styled-components";
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

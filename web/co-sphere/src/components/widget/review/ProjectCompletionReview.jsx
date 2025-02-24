import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useToast } from "../../../common/manager/contextManager/ToastContextManager";
import { manageCompleteProject } from "../../../common/manager/projectManager/ProjectManager";
import { manageAddReview } from "../../../common/manager/reviewManager/ReviewManager";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import FilledButton from "../../buttons/FilledButton";
import CustomDropDown from "../../input/dropdown/CustomDropDown";
import TextAreaWithWordCount from "../../input/textarea/TextAreaWithWordCount";
import TypeChip from "../chip/TypeChip";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  font-size: ${FontSize.medium};
  font-weight: 500;
  color: ${Colors.justBlack};
`;

const Center = styled.div``;

const Stars = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const Star = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ active }) =>
    active ? Colors.mainBlue : Colors.greyOutlineShadow};
`;

function ProjectCompletionReview({ project_id, members, setReload }) {
  const completionTypes = ["Delayed", "On-Time", "Early"];
  const [completionType, setCompletionType] = useState();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState(
    members.map((member) => ({ _id: member._id, review: "", rating: 0 }))
  );
  const { showToast } = useToast();

  const handleStarClick = (memberId, rating) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === memberId ? { ...review, rating } : review
      )
    );
  };

  const handleReviewChange = (memberId, text) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === memberId ? { ...review, review: text } : review
      )
    );
  };

  const completeProject = async () => {
    await manageCompleteProject(
      { projectId: project_id, completionType: completionType },
      () => {
        showToast("Project has been moved to completed section.");
        navigate(`/created-by-me/completed/${project_id}`);
      },
      (err) => {
        showToast(err);
      }
    );
  };

  const handleSubmit = async () => {
    const details = {
      projectId: project_id,
      reviews: reviews,
    };
    await manageAddReview(
      details,
      () => {
        completeProject();
      },
      (err) => {
        showToast(err);
      }
    );
  };

  return (
    <Wrapper>
      <Container>
        <Title>Add a final review before completing the project.</Title>
        {completionType && <TypeChip type={completionType} />}
        <CustomDropDown
          label="Did the project complete on time?"
          items={completionTypes}
          onChange={setCompletionType}
        />
        {members.map((member) => (
          <div key={member._id}>
            <div>Add a review for {member.fullname}</div>
            <TextAreaWithWordCount
              placeholder="Write a short review."
              value={reviews.find((r) => r._id === member._id)?.review || ""}
              onChange={(val) => handleReviewChange(member._id, val)}
            />
            <Stars>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  active={
                    reviews.find((r) => r._id === member._id)?.rating >= star
                  }
                  onClick={() => handleStarClick(member._id, star)}
                >
                  ★
                </Star>
              ))}
            </Stars>
          </div>
        ))}
        <Center>
          <FilledButton
            placeholder="Submit Review"
            onClick={() => handleSubmit()}
          />
        </Center>
      </Container>
    </Wrapper>
  );
}

export default ProjectCompletionReview;

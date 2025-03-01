import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useToast } from "../../common/manager/contextManager/ToastContextManager";
import { manageGetExploreProjects } from "../../common/manager/projectManager/ProjectManager";
import JobDetails from "../../components/widget/job/JobDetails";
import { Colors } from "../../constants/Colors";

// Slide animations
const slideFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Wrapper = styled.div`
  height: calc(100vh - 100px);
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const AnimatedContainer = styled.div`
  ${({ direction }) =>
    direction === "next"
      ? css`
          animation: ${slideFromRight} 0.4s ease-in-out;
        `
      : css`
          animation: ${slideFromLeft} 0.4s ease-in-out;
        `}
  height: calc(100% - 20px);
  border: 0.2px solid ${Colors.greyOutlineShadow};
  width: 800px;
  background-color: ${Colors.justWhite};
`;

const Button = styled.button`
  position: absolute;
  top: calc(50% -10px);
  transform: translateY(-50%);
  background: ${Colors.justWhite};
  color: white;
  border: 0.5px solid ${Colors.greyOutlineShadow};
  height: 50px;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${Colors.strokeBlue};
    path {
      stroke: ${Colors.justWhite} !important;
    }
  }
`;

const NextButton = styled(Button)`
  right: 20px;
`;

const PrevButton = styled(Button)`
  left: 20px;
`;

const ArrowIcon = styled.svg`
  width: 24px;
  height: 24px;
  transform: rotate(90deg);
  path {
    stroke: ${Colors.strokeBlue};
  }
`;

const ExploreSection = () => {
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const { showToast } = useToast();

  useEffect(() => {
    async function getAllExploreProjects() {
      await manageGetExploreProjects(
        (projects) => {
          setProjects(projects);
        },
        (err) => {
          setProjects([]);
          showToast(err);
        }
      );
    }
    getAllExploreProjects();
  }, []);

  const nextProject = () => {
    setDirection("next");
    setIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection("prev");
    setIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  return (
    <Wrapper>
      {projects.length > 0 && (
        <AnimatedContainer key={projects[index]._id} direction={direction}>
          <JobDetails projectId={projects[index]._id} />
        </AnimatedContainer>
      )}

      {projects.length > 1 && (
        <>
          <PrevButton onClick={prevProject}>
            <ArrowIcon
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 9L12 17L20 9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </ArrowIcon>
          </PrevButton>
          <NextButton onClick={nextProject}>
            <ArrowIcon
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 15L12 7L20 15"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </ArrowIcon>
          </NextButton>
        </>
      )}
    </Wrapper>
  );
};

export default ExploreSection;

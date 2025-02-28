import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useToast } from "../../../common/manager/contextManager/ToastContextManager";
import {
  manageApplyToProject,
  manageGetProjectById,
} from "../../../common/manager/projectManager/ProjectManager";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import { getUserIdFromLocalStorage } from "../../../service/LocalStorageService";
import { calculateTimeDifference } from "../../../utils/date/CalculateTimeDifference";
import { convertToDate } from "../../../utils/date/ConvertToDate";
import FilledButton from "../../buttons/FilledButton";
import LikeButton from "../../buttons/LikeButton";
import ShareButton from "../../buttons/ShareButton";
import ClockIcon from "../../icon/ClockIcon";
import SpinnerWidget from "../../loading/SpinnerWidget";
import PriceChip from "../chip/PriceChip";
import SkillChip from "../chip/SkillChip";
import DeadlineWidget from "../duration/DeadlineWidget";
import DurationWidget from "../duration/DurationWidget";
import ProfileWidget from "../profile/ProfileWidget";
import JobDetailContentWidget from "./widget/JobDetailContentWidget";

const Wrapper = styled.div`
  height: 100%;
`;
const Container = styled.div`
  height: calc(100%);
  display: flex;
  flex-direction: column;
`;
const Fixed = styled.div`
  height: fit-content;
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Content = styled.div`
  height: calc(100% - 80px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  padding-bottom: 0px;
`;
const Title = styled.div`
  font-size: ${FontSize.mediumLarge};
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: nowrap;
`;
const SkillsRow = styled.div`
  width: inherit;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  div {
    margin: 2px;
  }
`;
const PostedDate = styled.div`
  display: flex;
  align-items: center;
  font-size: ${FontSize.small};
  color: ${Colors.subtitleBlack};
  gap: 4px;
  svg {
    strokewidth: 1px !important;
    margin-bottom: -3px;
    height: 16px !important;
  }
`;
const Scroll = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
`;
const Bottom = styled.div`
  height: 80px;
  width: 100%;
  background-color: ${Colors.justWhite};
  border: 0.5px solid ${Colors.greyOutlineShadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    width: 300px;
  }
`;
const Profile = styled.div`
  background-color: ${Colors.chatBackground};
  border: 0.5px solid ${Colors.greyOutlineShadow};
  padding: 8px 15px;
  border-radius: 12px;
`;
function JobDetails({ projectId }) {
  const [project, setProject] = useState();
  const { showToast } = useToast();
  const [userId, setuserId] = useState();
  const [hasApplied, setHasApplied] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserId() {
      const userId = await getUserIdFromLocalStorage();
      setuserId(userId);
    }
    getUserId();
  }, []);

  useEffect(() => {
    async function getProject() {
      await manageGetProjectById(
        projectId,
        (project) => {
          setProject(project);
        },
        (err) => {
          showToast(err);
          setProject(null);
        }
      );
      setLoading(false);
    }
    getProject();
  }, []);

  useEffect(() => {
    function updateHasApplied() {
      if (project && userId) {
        project.applicants.map((applicant) => {
          applicant.user._id === userId
            ? setHasApplied(true)
            : setHasApplied(false);
        });
      }
      return;
    }
    updateHasApplied();
  }, [userId, project]);

  async function handleApply() {
    const details = { userId: userId, projectId: projectId };
    manageApplyToProject(
      details,
      () => {
        setHasApplied(true);
        showToast(
          "Applied to project. Go to your applications page for more details."
        );
      },
      (err) => {
        showToast(err);
        setHasApplied(false);
      }
    );
  }
  return (
    <Wrapper>
      <Container>
        {loading && <SpinnerWidget />}
        {project && (
          <>
            <Content>
              <Fixed>
                <Title>{project.projectName}</Title>
                <Flex>
                  <Row>
                    <PostedDate>
                      <ClockIcon />
                      <div>
                        Posted {calculateTimeDifference(project.createdAt)}
                      </div>
                    </PostedDate>
                    <PriceChip
                      min={project.salary.min}
                      max={project.salary.max}
                    />
                  </Row>
                  <Row>
                    <ShareButton />
                    <LikeButton />
                  </Row>
                </Flex>
                <Flex>
                  <Profile>
                    <ProfileWidget
                      url={project.postedBy.profileImage}
                      name={project.companyName || project.postedBy.fullname}
                      address={project.address}
                    />
                  </Profile>

                  {project.duration ? (
                    <DurationWidget
                      from={project.duration.from}
                      to={project.duration.to}
                    />
                  ) : (
                    <DeadlineWidget date={convertToDate(project.createdAt)} />
                  )}
                </Flex>
                <SkillsRow>
                  {project.skills.map((skill, key) => (
                    <SkillChip title={skill.name} key={key} />
                  ))}
                </SkillsRow>
              </Fixed>
              <Scroll>
                <JobDetailContentWidget />
              </Scroll>
            </Content>
            <Bottom>
              {hasApplied && hasApplied ? (
                <>
                  Already Applied {project.applicants.length - 1} more
                  applicants.
                </>
              ) : (
                <FilledButton
                  placeholder={"Apply Now"}
                  onClick={() => handleApply()}
                />
              )}
            </Bottom>
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default JobDetails;

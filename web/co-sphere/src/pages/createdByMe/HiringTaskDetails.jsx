import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useToast } from "../../common/manager/contextManager/ToastContextManager";
import {
  manageFinishHiring,
  manageGetProjectById,
  manageHireUser,
  manageRejectUser,
} from "../../common/manager/projectManager/ProjectManager";
import DeleteButton from "../../components/buttons/DeleteButton";
import EditJobDetailsButton from "../../components/buttons/EditJobDetailsButton";
import FilledButton from "../../components/buttons/FilledButton";
import ShareButton from "../../components/buttons/ShareButton";
import ClockIcon from "../../components/icon/ClockIcon";
import SpinnerWidget from "../../components/loading/SpinnerWidget";
import BasicWidgetTitleBlock from "../../components/textBlocks/BasicWidgetTitleBlock";
import PriceChip from "../../components/widget/chip/PriceChip";
import SkillChip from "../../components/widget/chip/SkillChip";
import TypeChip from "../../components/widget/chip/TypeChip";
import DurationWidget from "../../components/widget/duration/DurationWidget";
import ProfileWidget from "../../components/widget/profile/ProfileWidget";
import RejectedApplicantCard from "../../components/widget/profile/RejectedApplicantWidget";
import SelectedApplicantProfileWidget from "../../components/widget/profile/SelectedApplicantWidget";
import UnselectedApplicantProfileWidget from "../../components/widget/profile/UnselectedApplicantProfileWidget";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import { calculateTimeDifference } from "../../utils/date/CalculateTimeDifference";
import { convertToTime } from "../../utils/date/ConvertToTime";

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
  height: calc(100%);
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  padding-bottom: 0px;
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
  button {
    font-size: ${FontSize.small};
    height: 38px;
    width: 40px;
  }
`;
const SkillsRow = styled.div`
  width: inherit;
  display: flex;
  flex-wrap: wrap;
  div {
    margin: 2px;
  }
`;
const Box = styled.div`
  border: 1px solid ${Colors.greyOutlineShadow};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Scroll = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
`;
const Applicants = styled.div`
  max-width: inherit;
  margin-right: 1px;
`;
const Gap = styled.div`
  height: 1px;
  margin: 10px auto;
`;
function HiringTaskDetails({ projectId, updateState }) {
  const [project, setProject] = useState();
  const { showToast } = useToast();
  const [reload, setReload] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getProjectById() {
      await manageGetProjectById(
        projectId,
        (project) => {
          if (project.status === "Hiring") {
            setProject(project);
          } else {
            showToast("The project could not be found under hiring.");
          }
        },
        (err) => {
          console.log(err);
          setProject(null);
        }
      );
      setLoading(false);
    }
    getProjectById();
  }, [projectId, reload]);

  async function handleAccept(userId, projectId) {
    await manageHireUser(
      { userId: userId, projectId: projectId },
      () => {
        setReload(true);
        showToast("Applicant has been hired");
        updateState(1);
      },
      (err) => {
        showToast(err);
      }
    );
  }
  async function handleReject(userId, projectId) {
    await manageRejectUser(
      { userId: userId, projectId: projectId },
      () => {
        setReload(false);
        showToast("Applicant has been rejected");
        updateState(2);
      },
      (err) => {
        showToast(err);
      }
    );
  }
  async function handleFinishHiring() {
    await manageFinishHiring(
      projectId,
      () => {
        updateState(3);
        setReload(false);
        showToast("Project has been moved to the active tab.");
        navigate(`/created-by-me/active/${projectId}`);
      },
      (err) => {
        showToast(err);
      }
    );
  }
  return (
    <Wrapper>
      <Container>
        {loading && <SpinnerWidget />}
        {project && project != null ? (
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
                    <TypeChip type={project.status} />
                  </Row>
                  <Row>
                    <FilledButton
                      placeholder={"Finish Hiring"}
                      onClick={() => {
                        handleFinishHiring();
                      }}
                    />
                  </Row>
                </Flex>
                <Box>
                  <Flex>
                    <Row>
                      <ProfileWidget
                        name={project.companyName || project.postedBy.fullname}
                        address={project.address}
                      />
                      <PriceChip
                        min={project.salary.min}
                        max={project.salary.max}
                      />
                    </Row>
                    {project.duration && (
                      <DurationWidget
                        from={project.duration.from}
                        to={project.duration.to}
                      />
                    )}
                  </Flex>
                  <SkillsRow>
                    {project.skills.map((skill) => (
                      <SkillChip title={skill.name} />
                    ))}
                  </SkillsRow>
                  <Flex>
                    <EditJobDetailsButton />
                    <Row>
                      <ShareButton />
                      <DeleteButton />
                    </Row>
                  </Flex>
                </Box>
              </Fixed>
              <Gap />
              <Scroll>
                <Applicants>
                  <BasicWidgetTitleBlock
                    title={`All Pending Applicants (${project.pendingApplicants.length})`}
                  />
                  <Gap />
                  {project.pendingApplicants.map((applicant, key) => (
                    <UnselectedApplicantProfileWidget
                      applicant={applicant}
                      key={key}
                      onAccept={() => {
                        handleAccept(applicant.user._id, projectId);
                      }}
                      onReject={() => {
                        handleReject(applicant.user._id, projectId);
                      }}
                    />
                  ))}
                </Applicants>
                <Gap />
                <Gap />
                <Applicants>
                  <BasicWidgetTitleBlock
                    title={`Accepted (${project.acceptedApplicants.length})`}
                  />
                  <Gap />
                  {project ? (
                    project.acceptedApplicants.map((applicant, key) => (
                      <SelectedApplicantProfileWidget
                        name={applicant.user.fullname}
                        applicant={applicant.user}
                        profileImage={applicant.user.profileImage}
                        postedTime={convertToTime(applicant.date)}
                        key={key}
                        onReject={() =>
                          handleReject(applicant.user._id, projectId)
                        }
                      />
                    ))
                  ) : (
                    <>No accpted applicants</>
                  )}
                  <Gap />
                </Applicants>
                <Gap />
                <Gap />
                <Applicants>
                  <BasicWidgetTitleBlock
                    title={`Rejected (${project.rejectedApplicants.length})`}
                  />
                  <Gap />
                  {project &&
                    project.rejectedApplicants.map((applicant, key) => (
                      <RejectedApplicantCard
                        name={applicant.user.fullname}
                        postedTime={convertToTime(applicant.date)}
                        key={key}
                        onAccept={() =>
                          handleAccept(applicant.user._id, projectId)
                        }
                      />
                    ))}
                  <Gap />
                </Applicants>
              </Scroll>
            </Content>
          </>
        ) : (
          <Content>Could not load project</Content>
        )}
      </Container>
    </Wrapper>
  );
}
export default HiringTaskDetails;

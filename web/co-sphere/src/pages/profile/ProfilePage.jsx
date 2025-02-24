import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useToast } from "../../common/manager/contextManager/ToastContextManager";
import { manageGetUserById } from "../../common/manager/userManager/UserManager";
import LikeIcon from "../../components/icon/LikeIcon";
import LinkIcon from "../../components/icon/LinkIcon";
import MessageIcon from "../../components/icon/MessageIcon";
import ProfileIcon from "../../components/icon/ProfileIcon";
import SettingIcon from "../../components/icon/SettingIcon";
import ActionChip from "../../components/widget/chip/ActionChip";
import SkillChip from "../../components/widget/chip/SkillChip";
import SuccesssChip from "../../components/widget/chip/SuccesssChip";
import EditEducation from "../../components/widget/education/EditEducation";
import EditExperience from "../../components/widget/experience/EditExperience";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import { getUserIdFromLocalStorage } from "../../service/LocalStorageService";
import LoggedInUserLayout from "../common/LoggedInUserLayout";
import AboutSection from "./AboutSection";
import EditLinks from "./EditLinks";
import EditSkills from "./EditSkills";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import HistorySection from "./HistorySection";
import ReviewSection from "./ReviewSection";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 5vh;
  display: flex;
  align-items: center;
`;
const Overlay = styled.div`
  position: absolute;
  height: inherit;
  display: flex;
  align-items: center;
  width: inherit;
  background-color: #19161629;
`;
const Container = styled.div`
  width: calc(100% - 100px);
  max-width: 900px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;
  height: 500px;
  justify-content: space-between;
`;
const Right = styled.div`
  flex: 1;
  max-width: 500px;
  margin-top: 50px;
`;
const Profile = styled.div`
  text-align: center;
  a {
    color: ${Colors.justBlack};
    font-size: ${FontSize.medium};
    font-weight: 400;
  }
`;
const Address = styled.div`
  color: ${Colors.subtitleBlack};
  font-size: ${FontSize.medium};
`;

const ActionsFlex = styled.div`
  width: 145px;
  ul {
    padding-left: 0px !important;
    display: flex;
    font-size: ${FontSize.extraSmall};
    justify-content: space-between;
  }
  li {
    font-weight: 400;
    color: ${Colors.subtitleBlack};
    list-style: none;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;
const SkillsWidget = styled.div`
  width: 100%;
  margin-left: 50px;
  a {
    text-align: left !important;
    font-size: 14px;
    font-weight: 600;
  }
  span {
    color: ${Colors.mainBlue};
  }
`;
const SkillsContainer = styled.div`
  width: inherit;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  div {
    margin: 2px;
  }
`;
const TabContainer = styled.div`
  max-width: 450px;
  margin: auto;
  ul {
    display: flex;
    justify-content: space-between;
    padding-left: 0% !important;
  }
`;
const Li = styled.li`
  cursor: pointer;
  list-style: none;
  font-size: ${FontSize.medium};
  color: ${({ current }) =>
    current ? `${Colors.mainBlue}` : `${Colors.subtitleBlack}`};
  font-weight: ${({ current }) => (current ? `400` : `300`)};
`;
const ContentContainer = styled.div`
  max-width: 500px;
  margin: 20px;
  margin: 20px auto;
  background-color: ${Colors.justWhite};
  border: 0.5px solid ${Colors.greyOutlineShadow};
  padding: 20px;
  border-radius: 16px;
`;
const Padding = styled.div`
  overflow-y: scroll;
  max-height: 600px;
`;
const EditController = styled.div`
  min-height: 200px;
  min-width: 250px;
  max-height: 600px;
  max-width: 600px;
  margin: auto;
  border-radius: 12px;
  background-color: white;
  overflow-y: scroll;
`;
function ProfilePage() {
  const { userId } = useParams();
  const [currentTab, setCurrentTab] = useState("about");
  const [overlay, setOverlay] = useState(false);
  const [overlayWidget, setOverlayWidget] = useState(null);
  const [isUser, setIsUser] = useState();
  const [user, setUser] = useState();
  const { showToast } = useToast();

  useEffect(() => {
    async function getUser() {
      manageGetUserById(
        userId,
        (user) => setUser(user),
        (err) => {
          showToast(err);
        }
      );
    }
    getUser();
  }, []);
  useEffect(() => {
    async function isUser() {
      const localUserId = getUserIdFromLocalStorage();
      setIsUser(localUserId === userId);
    }
    isUser();
  }, [userId]);
  return (
    user && (
      <>
        <LoggedInUserLayout
          page={"profile"}
          body={
            <>
              {overlay && (
                <Overlay
                  onClick={() => {
                    setOverlay(!overlay);
                  }}
                >
                  <EditController
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {overlayWidget && overlayWidget === "EditLinks" ? (
                      <EditLinks />
                    ) : overlayWidget === "EditSkills" ? (
                      <EditSkills />
                    ) : overlayWidget === "EditExperience" ? (
                      <EditExperience />
                    ) : (
                      <EditEducation />
                    )}
                  </EditController>
                </Overlay>
              )}

              <Wrapper>
                <Container>
                  <Left>
                    <Profile>
                      <ProfileIcon url={user.profileImage} height={"180px"} />
                      <a>{user.fullname}</a>
                      <Address>
                        {user.city}, {user.country}
                      </Address>
                    </Profile>
                    <SuccesssChip percent={"100%"} />
                    <ActionsFlex>
                      <ul>
                        <li>
                          <div>
                            <LinkIcon />
                          </div>
                          Links
                        </li>
                        <li>
                          <div>
                            <LikeIcon />
                          </div>
                          121
                        </li>
                        <li>
                          <div>
                            <MessageIcon />
                          </div>
                          Chat
                        </li>
                        {isUser && (
                          <li
                            onClick={() => {
                              setOverlayWidget("EditLinks");
                              setOverlay(!overlay);
                            }}
                          >
                            <div>
                              <SettingIcon />
                            </div>
                            Edit
                          </li>
                        )}
                      </ul>
                    </ActionsFlex>
                    <SkillsWidget>
                      <a>
                        Skills (<span>{user.skills.length}</span>)
                      </a>
                      {console.log(user)}
                      <SkillsContainer>
                        {user.skills.map((skill) => (
                          <SkillChip title={skill.name} />
                        ))}
                        {isUser && (
                          <ActionChip
                            title={"Add More"}
                            onClick={() => {
                              setOverlayWidget("EditSkills");
                              setOverlay(!overlay);
                            }}
                          />
                        )}
                      </SkillsContainer>
                    </SkillsWidget>
                  </Left>
                  <Right>
                    <TabContainer>
                      <ul>
                        <Li
                          current={currentTab === "about"}
                          onClick={() => {
                            setCurrentTab("about");
                          }}
                        >
                          About
                        </Li>
                        <Li
                          current={currentTab === "experience"}
                          onClick={() => {
                            setCurrentTab("experience");
                          }}
                        >
                          Experience
                        </Li>
                        <Li
                          current={currentTab === "education"}
                          onClick={() => {
                            setCurrentTab("education");
                          }}
                        >
                          Education
                        </Li>
                        <Li
                          current={currentTab === "history"}
                          onClick={() => {
                            setCurrentTab("history");
                          }}
                        >
                          History
                        </Li>
                        <Li
                          current={currentTab === "reviews"}
                          onClick={() => {
                            setCurrentTab("reviews");
                          }}
                        >
                          Reviews
                        </Li>
                      </ul>
                    </TabContainer>
                    <ContentContainer>
                      <Padding>
                        {currentTab && currentTab === "about" ? (
                          <AboutSection user={user} isUser={isUser} />
                        ) : currentTab === "experience" ? (
                          <ExperienceSection
                            user={user}
                            isUser={isUser}
                            setOverlay={setOverlay}
                            setOverlayWidget={() => {
                              setOverlayWidget("EditExperience");
                            }}
                          />
                        ) : currentTab === "education" ? (
                          <EducationSection
                            user={user}
                            isUser={isUser}
                            setOverlay={setOverlay}
                            setOverlayWidget={() => {
                              setOverlayWidget("EditEducation");
                            }}
                          />
                        ) : currentTab === "history" ? (
                          <HistorySection userId={user._id} />
                        ) : currentTab === "reviews" ? (
                          <ReviewSection userId={user._id} />
                        ) : (
                          <AboutSection />
                        )}
                      </Padding>
                    </ContentContainer>
                  </Right>
                </Container>
              </Wrapper>
            </>
          }
        />
      </>
    )
  );
}

export default ProfilePage;

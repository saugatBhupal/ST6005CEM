import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import { manageGetConversationByMembers } from "../../../pages/chat/manager/ConversationManager";
import ChatButton from "../../buttons/ChatButton";
import ProfileIcon from "../../icon/ProfileIcon";
import SkillChip from "../chip/SkillChip";

const Wrapper = styled.div`
  background-color: ${Colors.justWhite};
  border-radius: 16px;
  margin: 20px auto;
  margin-right: 0px;
  padding: 20px;
  cursor: pointer;
  border: 0.5px solid ${Colors.greyOutlineShadow};
  box-shadow: 1px 5px 40px -30px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: ${Colors.menuSelected};
  }
`;
const Container = styled.div`
  width: 100%;
`;
const Top = styled.div`
  a {
    font-size: ${FontSize.extraSmall};
    color: ${Colors.subtitleBlack};
  }
  img {
    height: 50px;
    border-radius: 8px;
  }
`;
const Specifications = styled.div`
  ul {
    list-style: none;
    display: flex;
    font-size: ${FontSize.extraSmall};
    padding: 0px;
  }
  li {
    margin-right: 5px;
    font-weight: 400;
    color: ${Colors.subtitleBlack};
  }
`;
const Location = styled.div`
  font-size: ${FontSize.extraSmall};
  svg {
    margin-right: 6px;
    stroke: ${Colors.subtitleBlack};
  }
  div {
    font-weight: 500 !important;
    justify-content: left;
    align-items: center;
    color: ${Colors.subtitleBlack};
  }
`;
const Row = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Column = styled.div`
  height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;
const Content = styled.div`
  min-width: 100%;
  font-size: ${FontSize.small};
  font-weight: 300;
  color: ${Colors.subtitleBlack};
`;
function ProfileDetailsWidget({ user, userId }) {
  // const convoId = "67b59e755fa6077f7e508a1b";
  const navigate = useNavigate();
  const handleStartChat = async () => {
    await manageGetConversationByMembers(
      { members: [user._id, userId] },
      (convo) => {
        navigate(`/chat/${convo._id}`);
      },
      (err) => {
        alert(err);
      }
    );
  };
  return (
    user && (
      <Wrapper
        onClick={() => {
          navigate(`/profile/${user._id}`);
        }}
      >
        <Container>
          <Flex>
            <Column>
              <Top>
                <Row>
                  <Flex>
                    <ProfileIcon url={user.profileImage} height={"50px"} />
                    <div style={{ height: "fit-content" }}>
                      <div>{user.fullname}</div>
                      <Location>
                        <Flex style={{ gap: "2px" }}>
                          <div>
                            {user.city}, {user.country}
                          </div>
                        </Flex>
                      </Location>
                    </div>
                  </Flex>
                  <ChatButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartChat();
                    }}
                  />
                </Row>
              </Top>
              <Flex>
                <SkillChip title={"ReactJS"} />
                <SkillChip title={"NodeJS"} />
                <SkillChip title={"ReactJS"} />
                <SkillChip title={"NodeJS"} />
                <SkillChip title={"ReactJS"} />
                <SkillChip title={"NodeJS"} />
              </Flex>
              <Content>{user.about}</Content>
            </Column>
          </Flex>
        </Container>
      </Wrapper>
    )
  );
}

export default ProfileDetailsWidget;

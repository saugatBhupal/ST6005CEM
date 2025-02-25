import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useToast } from "../../common/manager/contextManager/ToastContextManager";
import { manageUpdateIntro } from "../../common/manager/userManager/UserManager";
import TextAreaWithActions from "../../components/input/textarea/TextAreaWithActions";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";
import { convertToDate } from "../../utils/date/ConvertToDate";

const Wrapper = styled.div``;
const Title = styled.div`
  font-size: ${FontSize.small};
  font-weight: 500;
  color: ${Colors.justBlack};
  margin-bottom: 10px;
`;
const Description = styled.div`
  color: ${Colors.subtitleBlack};
  font-size: ${FontSize.small};
  margin: 10px auto;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 20px auto;
`;
function AboutSection({ user, isUser }) {
  const [about, setAbout] = useState();
  const { showToast } = useToast();
  useEffect(() => {
    setAbout(user.about);
  }, [user]);
  async function handleSubmit() {
    if (about.trim() === null || about.trim() === "") {
      showToast("About section cannot be empty.");
      return;
    }
    await manageUpdateIntro(
      { userId: user._id, about: about },
      () => {
        showToast("About section updated.");
      },
      (err) => {
        showToast(err);
      }
    );
  }
  return (
    <Wrapper>
      <Title>{user.fullname}</Title>
      {isUser ? (
        <TextAreaWithActions
          value={user.about}
          placeholder="Tell us about yourself..."
          onClick={() => {
            handleSubmit();
          }}
          onChange={(val) => {
            setAbout(val);
          }}
        />
      ) : (
        <Description>
          {user.about || "User has not added any information about themselves."}
        </Description>
      )}

      <Flex>
        <div>
          <Title>Address</Title>
          <Description>
            {user.city}, {user.country}
          </Description>
        </div>
        <div>
          <Title>Joined</Title>
          <Description>{convertToDate(user.createdAt)}</Description>
        </div>
      </Flex>
      <Title>Contact</Title>
      {isUser ? (
        <Description>{user.email}</Description>
      ) : (
        <Description>{user.email}</Description>
      )}
    </Wrapper>
  );
}
export default AboutSection;

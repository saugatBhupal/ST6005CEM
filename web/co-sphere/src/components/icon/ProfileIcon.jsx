import React from "react";
import styled from "styled-components";
import ProfileImage from "../../assets/images/profile-sample.jpg";

const Wrapper = styled.div`
  img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
  }
`;
function ProfileIcon() {
  return (
    <Wrapper>
      <img src={ProfileImage} alt="" />
    </Wrapper>
  );
}

export default ProfileIcon;

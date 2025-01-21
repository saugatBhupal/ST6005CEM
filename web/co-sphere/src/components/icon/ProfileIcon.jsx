import React from "react";
import styled from "styled-components";
import ProfileImage from "../../assets/images/icon/profile_icon/profile_icon.png";

const Wrapper = styled.div`
  img {
    border-radius: 50%;
  }
`;
function ProfileIcon({ height }) {
  return (
    <Wrapper>
      <img src={ProfileImage} height={height} alt="" />
    </Wrapper>
  );
}

export default ProfileIcon;

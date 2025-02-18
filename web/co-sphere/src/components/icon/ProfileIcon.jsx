import React from "react";
import styled from "styled-components";
import ProfileImage from "../../assets/images/icon/profile_icon/profile_icon.png";

const Wrapper = styled.div`
  img {
    border-radius: 50%;
  }
`;
function ProfileIcon({ url, height }) {
  return (
    <Wrapper>
      <img
        src={url ? url : ProfileImage}
        height={height ? height : "40px"}
        width={height ? height : "40px"}
        alt=""
      />
    </Wrapper>
  );
}

export default ProfileIcon;

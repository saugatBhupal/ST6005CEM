import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { FontSize } from "../../../constants/FontSize";
import ProfileIcon from "../../icon/ProfileIcon";

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 115px;
  justify-content: space-between;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  b {
    font-size: ${FontSize.small};
  }
  a {
    font-size: ${FontSize.extraSmall};
    color: ${Colors.greyOutline};
  }
`;
function ProfileWidgetMenubar({ name, url }) {
  return (
    <Wrapper>
      <Container>
        <ProfileIcon url={url} height={"35px"} />
        <Right>
          <b>{name}</b>
          <a>Settings</a>
        </Right>
      </Container>
    </Wrapper>
  );
}

export default ProfileWidgetMenubar;

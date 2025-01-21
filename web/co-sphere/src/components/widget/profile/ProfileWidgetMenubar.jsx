import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import ProfileIcon from "../../icon/ProfileIcon";

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  justify-content: space-between;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  b {
    font-size: 14px;
  }
  a {
    font-size: 12px;
    color: ${Colors.greyOutline};
  }
`;
function ProfileWidgetMenubar() {
  return (
    <Wrapper>
      <Container>
        <ProfileIcon height={"45px"} />
        <Right>
          <b>John Cena</b>
          <a>Settings</a>
        </Right>
      </Container>
    </Wrapper>
  );
}

export default ProfileWidgetMenubar;

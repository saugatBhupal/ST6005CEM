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
  width: fit-content;
  gap: 5px;
  justify-content: space-between;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  b {
    font-size: ${FontSize.medium};
  }
  a {
    font-size: ${FontSize.extraSmall};
    color: ${Colors.greyOutline};
  }
`;
function ProfileWidget({ name, address }) {
  return (
    <Wrapper>
      <Container>
        <ProfileIcon height={"50px"} />
        <Right>
          <b>{name}</b>
          <a>{address}</a>
        </Right>
      </Container>
    </Wrapper>
  );
}

export default ProfileWidget;

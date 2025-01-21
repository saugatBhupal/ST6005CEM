import React from "react";
import styled from "styled-components";
import MenubarDashboard from "../../components/menubar/MenubarDashboard";
import SideMenuBarDesktop from "../../components/menubar/sideMenuBar/SideMenuBarDesktop";
import MenubarSpacerDashboard from "../../components/spacer/MenubarSpacerDashboard";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  background-color: ${Colors.backgroundWhite};
`;
const Container = styled.div`
  margin-left: 300px;
  width: calc(100vw - 300px);
`;

const Body = styled.div`
  overflow: hidden;
  height: calc(100vh - 110px);
  width: inherit;
`;

function LoggedInUserLayout({ body }) {
  return (
    <Wrapper>
      <SideMenuBarDesktop current={"home"} />
      <Container>
        <MenubarDashboard />
        <MenubarSpacerDashboard />
        <Body>{body}</Body>
      </Container>
    </Wrapper>
  );
}

export default LoggedInUserLayout;

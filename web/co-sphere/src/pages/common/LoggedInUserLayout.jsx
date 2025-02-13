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
  margin-left: 220px;
  width: calc(100vw - 220px);
`;

const Body = styled.div`
  overflow: hidden;
  height: calc(100vh - 100px);
  width: inherit;
`;

function LoggedInUserLayout({ body, page }) {
  return (
    <Wrapper>
      <SideMenuBarDesktop current={page ? page : "home"} />
      <Container>
        <MenubarDashboard />
        <MenubarSpacerDashboard />
        <Body>
          {/* <br /> */}
          {body}
        </Body>
      </Container>
    </Wrapper>
  );
}

export default LoggedInUserLayout;

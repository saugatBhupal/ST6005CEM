import React from "react";
import styled from "styled-components";
import MenubarDashboard from "../../components/menubar/MenubarDashboard";
import SideMenuBarDesktop from "../../components/menubar/sideMenuBar/SideMenuBarDesktop";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  background-color: ${Colors.backgroundWhite};
`;
const Container = styled.div`
  margin-left: 300px;
  width: calc(100vw - 300px);
  height: 2000px;
`;
function DashboardPage() {
  return (
    <Wrapper>
      <SideMenuBarDesktop />
      <Container>
        <MenubarDashboard />
      </Container>
    </Wrapper>
  );
}

export default DashboardPage;

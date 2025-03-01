import React from "react";
import styled from "styled-components";
import MenubarDefault from "../../components/menubar/MenubarDefault";
import MenubarSpacer from "../../components/spacer/MenubarSpacer";
import { Colors } from "../../constants/Colors";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  background-color: ${Colors.backgroundWhite};
`;
const Container = styled.div`
  width: 100%;
  background-color: ${Colors.backgroundWhite};
`;

const Body = styled.div`
  overflow: hidden;
  height: calc(100vh - 100px);
  border: 0.5px solid ${Colors.greyOutlineShadow};
  width: calc(100vw - 120px);
  margin: auto;
  margin-top: 18px;
  background-color: ${Colors.justWhite};
`;

function LoggedOutUserLayout({ body, page }) {
  return (
    <Wrapper>
      <Container>
        <MenubarDefault />
        <MenubarSpacer />
        <Body>
          {/* <br /> */}
          {body}
        </Body>
      </Container>
    </Wrapper>
  );
}

export default LoggedOutUserLayout;

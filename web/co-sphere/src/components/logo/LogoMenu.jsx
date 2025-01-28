import React from "react";
import styled from "styled-components";
import LogoImage from "../../assets/images/logo/logo.svg";
import { Colors } from "../../constants/Colors";
import { FontSize } from "../../constants/FontSize";

const Wrapper = styled.div``;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 140px;
  justify-content: space-between;
`;
const LogoImg = styled.div`
  background-color: transparent;
`;
const LogoText = styled.div`
  color: ${Colors.mainBlue};
  font-size: ${FontSize.large};
  font-weight: 500;
`;
function LogoMenu() {
  return (
    <Wrapper>
      <Container>
        <LogoImg>
          <img src={LogoImage} alt="logo" height={"35px"} />
        </LogoImg>
        <LogoText>Co-Sphere</LogoText>
      </Container>
    </Wrapper>
  );
}

export default LogoMenu;

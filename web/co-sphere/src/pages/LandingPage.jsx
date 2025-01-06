import React from "react";
import styled from "styled-components";
import HomePageBanner from "../assets/images/home-page-banner.png";
import FilledButton from "../components/buttons/FilledButton";
import OutlinedButton from "../components/buttons/OutlinedButton";
import MenubarDefault from "../components/menubar/MenubarDefault";
import MenubarSpacer from "../components/spacer/MenubarSpacer";
import { Colors } from "../constants/Colors";

const Wrapper = styled.div``;
const Container = styled.div`
  position: relative;
  /* display : flex; */
  /* flex-direction : column; */
  /* justify-content : space-between; */
`;
const Center = styled.div`
  max-width: 650px;
  margin: auto;
  margin-top: 20px;
  text-align: center;
`;
const Title = styled.div`
  color: ${Colors.justBlack};
  font-weight: 500;
  font-size: 70px;
`;
const SubTitle = styled.div`
  color: ${Colors.subtitleBlack};
  font-weight: 400;
  font-size: 16px;
  margin: 20px auto;
`;
const Buttons = styled.div`
  display: flex;
  width: fit-content;
  margin: 30px auto;
  button {
    width: 150px;
    margin: auto 10px;
  }
`;
const Bottom = styled.div`
  width: 100vw;
  height: auto;
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  background-color: transparent;
`;

const Rectangle = styled.div`
  width: 80%;
  height: auto;
  margin: auto;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;
function LandingPage() {
  return (
    <Wrapper>
      <MenubarDefault />
      <MenubarSpacer />
      <Container>
        <Center>
          <Title>Connecting talents with projects</Title>
          <SubTitle>
            We make it easy to find your dream job - regardless of your location
            <br /> Browse over 100,000 jobs from top companies to fast-growing
            startups
          </SubTitle>
          <Buttons>
            <OutlinedButton placeholder="Find a job" onClick={() => {}} />
            <FilledButton placeholder="Find a job" onClick={() => {}} />
          </Buttons>
        </Center>
        <Bottom>
          <Rectangle>
            <img src={HomePageBanner} alt="" />
          </Rectangle>
        </Bottom>
      </Container>
    </Wrapper>
  );
}

export default LandingPage;
